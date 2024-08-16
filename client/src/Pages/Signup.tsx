import { useNavigate } from 'react-router-dom';
import img from '../../public/vite.svg'

const Signup = () => {
  const navigate = useNavigate()
  const handlesignin = () => {
    navigate('/')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img src={img} alt="" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Gmail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account? <a href="" className="text-indigo-600 hover:underline" onClick={handlesignin}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup
