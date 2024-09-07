import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axois/Axois";
import { useUser } from "../useHook/User";

interface ProfileProps {
  profilePic: string;
  username: string;
  name: string;
  bio: string;
  posts: { photo: string }[];
}

const Profile: React.FC = (): JSX.Element => {
  const { user, loading, error } = useUser();
  const [profilePic, setProfilePic] = useState("");
  const [posts, setPosts] = useState<{ photo: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfilePic(user.photo);
      axiosInstance
        .get(`/post/posts/user/${user.id}/`)
        .then((response) => {
          console.log("Fetched posts:", response.data); // Debug: Log fetched data
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [user]);

  const profileData: ProfileProps = {
    profilePic: profilePic,
    username: '@' + (user?.username || "username"),
    name: (user?.first_name || "") + " " + (user?.last_name || "name"),
    bio: user?.bio || "",
    posts: posts,
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
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Profile Header */}
      <div className="flex items-center mb-6 border-b pb-4 justify-center">
        <img
          src={profileData.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full mr-6 cursor-pointer object-cover"
          onClick={handleProfilePicClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{profileData.username}</h2>
          <p className="text-gray-700 text-lg mb-1">{profileData.name}</p>
          <p className="text-gray-600 mb-4">{profileData.bio}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-3 gap-4">
          {profileData.posts.map((post, index) => (
            <img
              key={index}
              src={`http://127.0.0.1:8000${post.photo}`} // Ensure the path is correct
              alt={`Post ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
