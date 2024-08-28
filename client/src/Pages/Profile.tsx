import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  profilePic: string;
  username: string;
  name: string;
  bio: string;
  posts: string[];
}

const Profile: React.FC = () => {
  const profileData: ProfileProps = {
    profilePic: "https://via.placeholder.com/150",
    username: "john_doe",
    name: "John Doe",
    bio: "Travel enthusiast. Love to explore new places and cultures.",
    posts: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <img
          src={profileData.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h2 className="text-xl font-bold">{profileData.username}</h2>
          <p className="text-gray-600">{profileData.name}</p>
          <p className="text-gray-500 text-sm">{profileData.bio}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={()=>
            navigate('/profile/edit')
          }>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="grid grid-cols-3 gap-4">
        {profileData.posts.map((post, index) => (
          <img
            key={index}
            src={post}
            alt={`Post ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
