# Blog Platform

Welcome to the Blog Platform project! This application allows users to create, manage, and read blogs with a modern interface and a robust backend.

## Features

- **User Authentication**: Secure login and registration with JWT.
- **Blog Management**: Create, edit, delete, and manage blog posts.
- **User Profiles**: Personalized profiles with user-specific content.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Comments**: Users can comment on blog posts.
- **Tags and Categories**: Organize posts with tags and categories.
- **Search Functionality**: Search blogs by title or content.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Django, Django REST Framework, Djoser, JWT
- **Database**: MySQL

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MySQL

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/charitraa/CodSoft.git
    cd CodSoft/client
    ```

2. Install dependencies:
    ```bash
    npm i
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd CodSoft/api
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure Django settings for JWT authentication with Djoser. Add the following to `blog_platform/settings.py`:

    ```python
    # Add 'rest_framework', 'rest_framework_simplejwt', and 'djoser' to your INSTALLED_APPS
    INSTALLED_APPS = [
        ...
        'rest_framework',
        'rest_framework_simplejwt',
        'djoser',
    ]

    # Configure REST framework settings
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ),
    }

    # Add your JWT settings
    SIMPLE_JWT = {
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
        'ROTATE_REFRESH_TOKENS': True,
        'BLACKLIST_AFTER_ROTATION': True,
        'UPDATE_LAST_LOGIN': True,
        'ALGORITHM': 'HS256',
        'SIGNING_KEY': 'your-secret-key',
        'VERIFYING_KEY': None,
        'AUTH_HEADER_TYPES': ('Bearer',),
        'USER_ID_FIELD': 'id',
        'USER_ID_CLAIM': 'user_id',
        'AUTH_TOKEN_CLASSES': ('access',),
    }

    # Email Configuration
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = 'Email'
    EMAIL_HOST_PASSWORD = 'Password'
    DEFAULT_FROM_EMAIL = 'Email'
    ```

5. Add Djoser URLs to your `urls.py`:

    ```python
   from django.urls import path, include

    urlpatterns = [
      path('auth/', include('djoser.urls')),
      path('auth/', include('djoser.urls.jwt')),  # if using JWT
    ]
    ```

6. Apply migrations and start the server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

## JWT Authentication

### Backend

1. Install the required packages:
    ```bash
    pip install djangorestframework-simplejwt djoser
    ```

### Frontend

1. Install `axios` for making HTTP requests:
    ```bash
    npm install axios
    ```

2. Configure Axios to include JWT tokens in requests. Create a file `src/api.js`:

    ```javascript
    import axios from 'axios';

    const API_URL = process.env.REACT_APP_API_URL;

    const api = axios.create({
        baseURL: API_URL,
    });

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    export default api;
    ```

3. Handle authentication in your React components. Example of login and storing the JWT token:

    ```javascript
    import React, { useState } from 'react';
    import api from './api';

    const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                const response = await api.post('/api/auth/jwt/create/', { username, password });
                localStorage.setItem('access_token', response.data.access);
                // Redirect or update UI
            } catch (error) {
                console.error('Login failed', error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        );
    };

    export default Login;
    ```

## Usage

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) to access the React application.
- **Backend**: Open [http://localhost:8000](http://localhost:8000) to interact with the Django API.

## Contributing

1. Fork the repository:
    ```bash
    git clone https://github.com/charitraa/CodSoft.git
    cd CodSoft
    git checkout -b feature/YourFeature
    ```

2. Create a new branch:
    ```bash
    git checkout -b feature/YourFeature
    ```

3. Commit your changes:
    ```bash
    git commit -m 'Add new feature'
    ```

4. Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```

5. Open a Pull Request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, email me at [stharabi9862187405@gmail.com](mailto:stharabi9862187405@gmail.com).
