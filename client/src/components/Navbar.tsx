import { useNavigate } from 'react-router-dom'
import img from '../../public/vite.svg'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* Logo */}
             <img src={img} alt="" />
            {/* Company Name or Logo Text */}
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 border-b-2 border-indigo-600"onClick={() =>
            {
              navigate('/home')
              }
            }>Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Post</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600" onClick={() =>
            {
              navigate('/contact')
              }
            }>Contact</a>
          </div>
        </div>

        {/* Right Section: Search, Notifications, and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.707 20.293l-5.397-5.397C17.309 13.501 18 11.832 18 10c0-4.411-3.589-8-8-8S2 5.589 2 10s3.589 8 8 8c1.832 0 3.501-.691 4.896-1.69l5.397 5.397 1.414-1.414zM4 10c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z" />
              </svg>
            </div>
          </div>

          {/* Notifications */}
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 24c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm10-6V12c0-5.108-3.937-9.294-9-9.876V2c0-.553-.447-1-1-1s-1 .447-1 1v.124C5.937 2.706 2 6.892 2 12v6l-2 2v1h22v-1l-2-2zm-2 1H4v-7c0-4.418 3.582-8 8-8s8 3.582 8 8v7z" />
            </svg>
          </button>

          {/* Profile Picture */}

          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            onClick={
              () => {
                // Handle Profile Click Event
                navigate('/profile')
              }
            }
            className="w-8 h-8 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
