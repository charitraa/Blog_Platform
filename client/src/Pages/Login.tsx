import { useNavigate } from 'react-router-dom'
import logo from '../../public/vite.svg'
const Login = () => {
  const navigate = useNavigate()

  const handleSignup = () => {
      navigate('/signup')
    }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
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
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-900">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
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
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" alt="GitHub" />
              </button>
            </div>
          </div>
          <p className="mt-6 text-sm text-center text-gray-600">
            Not a member? <a href="" className="text-indigo-600 hover:underline" onClick={handleSignup}>Signup</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
