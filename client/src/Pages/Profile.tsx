import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axois/Axois";
import { useUser } from "../useHook/User";

interface ProfileProps {
  profilePic: string;
  username: string;
  name: string;
  bio: string;
  posts: string[];
}

const Profile: React.FC = (): JSX.Element => {
  const { user, loading, error } = useUser();
  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfilePic(user.photo);
    }
  })
  const profileData: ProfileProps = {
    profilePic: profilePic,
    username: '@' + (user?.username || "username"),
    name: (user?.first_name || "") + " " + (user?.last_name || "name"),
    bio: user?.bio || "",
    posts: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
  };

  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await axiosInstance.put('/user/photo/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProfilePic(response.data.photo);
        window.location.reload();
      } catch (error) {
        console.error("Error uploading profile photo:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <img
          src={profileData.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6 cursor-pointer object-cover"
          onClick={handleProfilePicClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div>
          <h2 className="text-xl font-bold">{profileData.username}</h2>
          <p className="text-gray-600">{profileData.name}</p>
          <p className="text-gray-500 text-sm">{profileData.bio}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/profile/edit")}
          >
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
