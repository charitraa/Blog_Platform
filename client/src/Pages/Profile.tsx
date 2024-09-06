import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector} from '../useHook/Hook';
import axiosInstance from "../Axois/Axois";
interface ProfileProps {
  profilePic: string;
  username: string;
  name: string;
  bio: string;
  posts: string[];
}

const Profile: React.FC = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);
  const [Count, setCount] = useState(0)

  const users = localStorage.getItem('user');
  const parsedUser = users ? JSON.parse(users) : null;

  const profileData: ProfileProps = {
    profilePic:user?.photo || "https://via.placeholder.com/300",
    username: '@' +user?.username || "username",
    name: user?.first_name +'  '+ user?.last_name || "name",
    bio: user?.bio || '',
    posts: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
  };
  const navigate = useNavigate();

  useEffect(() => {
  // Define an asynchronous function to fetch the post count
  const fetchPostCount = async () => {
    try {
      const response = await axiosInstance.get(`/post/posts/count/${parsedUser.id}/`);
      // Set Count to the post_count value, not the entire response object
      setCount(response.data.post_count);
    } catch (error) {
      console.error('Error fetching post count:', error);
      setCount(0); // Optionally handle the error and set a default count
    }
  };

  fetchPostCount();
  }, [parsedUser?.id]);

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
          <p> Posts <span>{Count}</span></p>

          <p className="text-gray-500 text-sm">{profileData.bio}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => navigate('/profile/edit')}
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
