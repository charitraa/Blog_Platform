import React, { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Axois/Axois';
import { useUser } from '../useHook/User';

type PostFormValues = {
  title: string;
  content: string;
  photo: File | null; // Changed from string to File | null
};

export default function EditBlogPostForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<PostFormValues>({
    title: '',
    content: '',
    photo: null, // Initialize as null
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // State for photo preview
  const { user } = useUser();

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    photo: '',
  });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance(`/post/posts/${id}/`);
          if (!response) {
            throw new Error('Failed to fetch post');
          }
          setFormValues({
            ...response.data,
            photo: null, // Reset photo to null for consistency
          });
          // Reset photo preview if there's an existing photo URL
          if (response.data.photo) {
            setPhotoPreview(`http://127.0.0.1:8000${response.data.photo}`);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/post/posts/${id}/`);
      if (response.status === 204) { // Check for 204 No Content
        toast.success('Post deleted successfully');
        setTimeout(() => {
          navigate('/profile'); // Redirect to the profile page after 1 second
        }, 1000);
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while deleting the post.');
    }
  };

  useEffect(() => {
    // Update the photo preview when the selected file changes
    if (formValues.photo) {
      const objectUrl = URL.createObjectURL(formValues.photo);
      setPhotoPreview(objectUrl);

      // Clean up object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formValues.photo]);

  const validateForm = () => {
    const newErrors = {
      title: formValues.title ? '' : 'Title is required',
      content: formValues.content ? '' : 'Content is required',
      photo: '',
    };

    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormValues({
      ...formValues,
      photo: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('content', formValues.content);
      formData.append('author', user.id);
      if (formValues.photo) formData.append('photo', formValues.photo);

      try {
        const response = await axiosInstance.put(`/post/posts/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response) {
          toast.success('Post updated successfully!');
          setTimeout(() => {
            window.location.reload(); // Reload to reflect the changes
          }, 1000);
        } else {
          toast.error('Failed to update the post.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center pt-12">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-md"
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b pb-12">
            <h2 className="text-base font-semibold">Edit Blog Post</h2>
            <p className="mt-1 text-sm text-gray-600">Update the details of your post.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formValues.title}
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className="block w-full rounded-md shadow-sm"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <div className="col-span-full">
                <label htmlFor="content" className="block text-sm font-medium">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  value={formValues.content}
                  onChange={handleChange}
                  placeholder="Enter post content"
                  className="block w-full rounded-md shadow-sm"
                />
                {errors.content && <p className="text-red-500">{errors.content}</p>}
              </div>

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium">
                  Photo (optional)
                </label>
                {photoPreview && (
                  <div className="mb-4 w-48 h-48 overflow-hidden">
                    <img
                      src={photoPreview}
                      alt="Post"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="mt-2 flex items-center gap-x-3">
                  <PhotoIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm"
                  />
                  {errors.photo && <p className="text-red-500">{errors.photo}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="bg-red-600 text-white px-3 py-2 rounded-md"
            onClick={handleDelete} // Call handleDelete directly
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-3 py-2 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className="text-sm font-semibold"
            onClick={() => { setFormValues({ title: '', content: '', photo: null }); navigate('/profile') }}
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}
