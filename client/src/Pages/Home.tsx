import React from 'react';
import Image from '../assets/image (9).png';
import { useAppSelector} from '../useHook/Hook';
import BlogSection from '../components/BlogSection';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  return (
    <>
    <div
      className="relative isolate min-h-screen px-6 pt-14 lg:px-8"
      style={{
        backgroundImage: `url('${Image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="mx-auto max-w-2xl flex flex-col justify-center sm:py-48 lg:py-56"
        style={{
          height: '100vh',
        }}
      >
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to Our Blog Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Discover insights, stories, and tips from our experienced writers. Stay updated with the latest trends, tech tips, and more!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  navigate('/post')
                }}
              >
                Get Started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white" onClick={()=>navigate('/about')}>
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
        {isAuthenticated ? (
          // Render blog or cart content if user is authenticated
        <BlogSection/>
        ) : (
          // Render login prompt if user is not authenticated
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
              Please Log In
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              You must be logged in to view our blog platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login" // Link to your login page
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </a>
            </div>
          </div>
        )}
      </>
  );
};

export default Home;
