import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import img from '../../public/vite.svg';
import { useAppSelector, useAppDispatch } from '../useHook/Hook';
import { Logout } from '../Axois/auth';
import axiosInstance from '../Axois/Axois';
import { access_token } from './access';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [image, setImage] = useState<string | undefined>();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    Logout(dispatch);
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosInstance.get('/user/auth/users/me/', {
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        });

        setImage(userResponse.data.photo);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  }, [access_token]);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={img} alt="Logo" className="h-8 w-8" />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex-grow flex items-center justify-center space-x-8">
              <a
                href=""
                className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                  isActive('/') ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => navigate('/')}
              >
                Home
              </a>
              <a
                href=""
                className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                  isActive('/post') ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => navigate('/post')}
              >
                Post
              </a>
              <a
                href=""
                className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                  isActive('/about') ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => navigate('/about')}
              >
                About
              </a>
              <a
                href=""
                className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                  isActive('/contact') ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => navigate('/contact')}
              >
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.707 20.293l-5.397-5.397C17.309 13.501 18 11.832 18 10c0-4.411-3.589-8-8-8S2 5.589 2 10s3.589 8 8 8c1.832 0 3.501-.691 4.896-1.69l5.397 5.397 1.414-1.414zM4 10c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z" />
                  </svg>
                </div>
              </div>

              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 24c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm10-6V12c0-5.108-3.937-9.294-9-9.876V2c0-.553-.447-1-1-1s-1 .447-1 1v.124C5.937 2.706 2 6.892 2 12v6l-2 2v1h22v-1l-2-2zm-2 1H4v-7c0-4.418 3.582-8 8-8s8 3.582 8 8v7z" />
                </svg>
              </button>

              <div className="relative">
                <img
                  src={image}
                  alt="Profile"
                  onClick={toggleSubMenu}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                />

                {showSubMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate('/profile')}
                    >
                      View Profile
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-8">
            <a
              href=""
              className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                isActive('/') ? 'border-indigo-600' : 'border-transparent'
              }`}
              onClick={() => navigate('/')}
            >
              Home
            </a>
            <a
              href=""
              className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                isActive('/about') ? 'border-indigo-600' : 'border-transparent'
              }`}
              onClick={() => navigate('/about')}
            >
              About
            </a>
            <a
              href=""
              className={`text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out border-b-2 ${
                isActive('/contact') ? 'border-indigo-600' : 'border-transparent'
              }`}
              onClick={() => navigate('/contact')}
            >
              Contact
            </a>

            <button
              className="ml-4 px-4 py-2 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;