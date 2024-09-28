import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Axois/Axois';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  photo: string;
}

interface Comment {
  id: string;
  content: string;
  user: string; // For simplicity, assume 'user' is the username or id
}

const BlogPostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance(`/post/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the blog post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axiosInstance(`/post/posts/${id}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await axiosInstance.post(`/post/posts/${id}/comments/`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    try {
      await axiosInstance.put(`/post/posts/${id}/comments/${commentId}/`, {
        content: editingContent,
      });
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, content: editingContent } : comment
        )
      );
      setEditingCommentId(null);
      setEditingContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(`/post/posts/${id}/comments/${commentId}/`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Blog Post Card */}
      <div className="p-12 bg-white shadow-md rounded-lg">
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
      </div>

      {/* Comments Card */}
      <div className="p-12 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                />
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg mr-2"
                  onClick={() => handleEditComment(comment.id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white py-1 px-4 rounded-lg"
                  onClick={() => setEditingCommentId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingContent(comment.content);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Comment Section */}
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none mb-4"
          ></textarea>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
