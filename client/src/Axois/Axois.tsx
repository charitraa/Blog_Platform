import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
    config => {
        // Get the access token from local storage
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'JWT ' + token; // Use JWT token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Check if the error response status is 401 (Unauthorized) and if the request has not been retried
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Get the refresh token from local storage
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    // Make a request to refresh the access token
                    const refreshResponse = await axios.post('http://127.0.0.1:8000/user/auth/jwt/refresh/', {
                        refresh: refreshToken
                    });

                    // Store the new access token
                    localStorage.setItem('access_token', refreshResponse.data.access);

                    // Update the authorization header in the original request
                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + refreshResponse.data.access;

                    // Retry the original request with the new access token
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Handle token refresh errors (e.g., log out the user)
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token available, log out the user
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
