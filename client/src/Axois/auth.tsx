import axiosInstance from './Axois';

export const register = async (
  firstName: string,
  lastName: string,
  username: string,
  dateOfBirth: string,
  email: string,
  password: string,


) => {
  try {
    const response = await axiosInstance.post('user/auth/users/', {
      first_name: firstName,
      last_name: lastName,
      username: username,
      date_of_birth: dateOfBirth,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export const login = async (email: String, password: String) => {
  const response = await axiosInstance.post('/auth/jwt/create/', { email, password });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);

  const userResponse = await axiosInstance.get('/auth/users/me/');
  return userResponse.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};