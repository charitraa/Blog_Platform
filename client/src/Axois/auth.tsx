import axiosInstance from './Axois';
import { loginSuccess, logout } from '../store/features/auth/authSlice';
import { AppDispatch } from '../store/index';

export const register = async (
  firstName: string,
  lastName: string,
  username: string,
  dateOfBirth: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post('/user/auth/users/', {
      first_name: firstName,
      last_name: lastName,
      username,
      date_of_birth: dateOfBirth,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const login = async (dispatch: AppDispatch, email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/user/auth/jwt/create/', { email, password });
    const { access, refresh } = response.data;

    const userResponse = await axiosInstance.get('/user/auth/users/me/', {
      headers: {
        Authorization: `JWT ${access}`,
      },
    });

    dispatch(loginSuccess({
      accessToken: access,
      refreshToken: refresh,
      user: userResponse.data,
    }));

    return userResponse.data;
  } catch (error: any) {
    throw error;
  }
};

export const Logout = (dispatch: AppDispatch) => {
  dispatch(logout());
};
