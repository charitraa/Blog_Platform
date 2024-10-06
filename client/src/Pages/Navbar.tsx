import React from 'react';
import { FiHome, FiBell, FiBookmark, FiFileText, FiEdit } from 'react-icons/fi';

const Navbar: React.FC = () => {
  return (
    <div className="h-screen w-16 flex flex-col items-center justify-between bg-white py-6 shadow-lg">
      {/* Top Section - Logo */}
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 bg-black rounded-full"></div>
      </div>

      {/* Middle Section - Navigation Icons */}
      <div className="flex-grow flex flex-col items-center justify-start space-y-8 mt-10">
        <FiHome className="w-6 h-6 text-gray-700 hover:text-black" />
        <FiBell className="w-6 h-6 text-gray-700 hover:text-black" />
        <FiBookmark className="w-6 h-6 text-gray-700 hover:text-black" />
        <FiFileText className="w-6 h-6 text-gray-700 hover:text-black" />
      </div>

      {/* Bottom Section - Profile */}
      <div className="space-y-8 flex flex-col items-center mb-4">
        <FiEdit className="w-6 h-6 text-gray-700 hover:text-black" />
        <img
          src="https://via.placeholder.com/40" // replace with your profile image URL
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </div>
  );
};

export default Navbar;
