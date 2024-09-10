import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../useHook/Hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../public/vite.svg';
import { login } from '../Axois/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      toast.error('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email address is invalid');
      isValid = false;
    }

    if (!password) {
      toast.error('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = await login(dispatch, email, password); // Pass dispatch as the first argument
        if (user) {
          toast.success('Login successful');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          toast.error('Failed to login. Please check your email and password');
        }
      } catch (error: any) {
        toast.error('Login failed');
      }
    }
  };

  const handleLoginWithGithub =()=>{
        window.location.assign(`https://github.com/login/oauth/authorize/?client_id=Ov23likU81Y6vJxr6Y2Z`)
    }

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-900">Remember me</span>
              </label>
              <div className="text-sm text-indigo-600 hover:underline  cursor-pointer">Forgot password?</div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6">
            <p className="text-center text-gray-600">Or continue with</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none" onClick={handleLoginWithGithub}
              >
                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" alt="GitHub" />
              </button>
            </div>
          </div>
          <p className="mt-6 text-sm text-center text-gray-600">
            Not a member? <div className="text-indigo-600 hover:underline cursor-pointer" onClick={handleSignup}>Signup</div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
