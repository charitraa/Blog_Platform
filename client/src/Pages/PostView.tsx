import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Axois/Axois';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  photo: string;
}

const BlogPostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance(`/post/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching the blog post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-12 bg-white shadow-md rounded-lg">
      {/* Image Section */}
      <div className="mb-10">
        <img
          src={`http://127.0.0.1:8000${post.photo}`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Title Section */}
      <h2 className="text-4xl font-bold mb-4">{post.title}</h2>

      {/* Content Section */}
      <div className="text-gray-700 mb-6">
        <p>{post.content}</p>
      </div>

      {/* Add Comment Section */}
      <div className="mt-6">
        {!isCommentBoxVisible ? (
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
            onClick={() => setCommentBoxVisible(true)}
          >
            Add Comment
          </button>
        ) : (
          <div>
            <textarea
              placeholder="Add a comment..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none mb-4"
            ></textarea>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostView;
