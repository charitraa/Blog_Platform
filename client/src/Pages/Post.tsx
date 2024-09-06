import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Post } from '../Axois/user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

type PostFormValues = {
  title: string;
  content: string;
  photo: File | null;
};

export default function BlogPostForm() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<PostFormValues>({
    title: '',
    content: '',
    photo: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    photo: '',
  });

  const validateForm = () => {
    const newErrors = {
      title: formValues.title ? '' : 'Title is required',
      content: formValues.content ? '' : 'Content is required',
      photo: formValues.photo ? '' : 'Photo is required',
    };

    setErrors(newErrors);
    return !newErrors.title && !newErrors.content && !newErrors.photo;
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
      try {
        const result = await Post(formValues.title, formValues.content, formValues.photo!);
        if (result) {
          toast.success('Post created successfully!');
          setTimeout(() => {
            navigate('/'); // Navigate to homepage
          }, 2000);
        } else {
          toast.error('Failed to create the post.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-md"
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b pb-12">
            <h2 className="text-base font-semibold">Create Blog Post</h2>
            <p className="mt-1 text-sm text-gray-600">Fill out the form to create a new post.</p>

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
                  Photo
                </label>
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
            className="text-sm font-semibold"
            onClick={() => setFormValues({ title: '', content: '', photo: null })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-3 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
