import React, { useEffect } from 'react';
import Image from '../assets/image (9).png';
import { useAppSelector} from '../useHook/Hook';
import BlogSection from '../components/BlogSection';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../Axois/Axois';
import { toast } from 'react-toastify';


const Home: React.FC = () => {
  const [searchparams] = useSearchParams()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const send_github__code_to_server = async()=>{
            if (searchparams) {
                try {
                const urlparam = searchparams.get('code')  
                const resp = await axiosInstance.post('/user/github/', {'code':urlparam})
                const result = resp.data
                console.log(result)
                if (resp.status===200) {
                    const user ={
                    'email':result.email,
                    'names':result.full_name
                }
                localStorage.setItem('access_token', JSON.stringify(result))
                localStorage.setItem('refresh_token', JSON.stringify(result))

                navigate('/')
                toast.success('login successful')
                }
              } catch (error:any) {
                  if (error.response) {
                    console.log(error.response.data);
                    toast.error(error.response.data.detail)
                  } 
                }  
              }
        
    } 

  let code =searchparams.get('code')
    useEffect(() => {
        if (code) {
          send_github__code_to_server()  
        }   
    }, [code])
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
              <div
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  navigate('/post')
                }}
              >
                Get Started
              </div>
              <div className="text-sm cursor-pointer font-semibold leading-6 text-white" onClick={()=>navigate('/about')}>
                Learn More <span aria-hidden="true">→</span>
              </div>
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
              <div
                // Link to your login page
                onClick={()=> navigate('/login')}
                className="rounded-md bg-indigo-600 cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </div>
            </div>
          </div>
          
      )}
      
      </>
  );
};

export default Home;
