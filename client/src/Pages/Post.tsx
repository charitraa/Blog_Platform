import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

type PostFormValues = {
  title: string;
  photo: File | null;
  content: string;
};

export default function BlogPostForm() {
  const [formValues, setFormValues] = useState<PostFormValues>({
    title: '',
    photo: null,
    content: '',
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <div className="w-full h-screen flex items-center justify-center m-0 p-0">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-md">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Create Blog Post</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Fill out the form below to create a new blog post.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formValues.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={3}
                    value={formValues.content}
                    onChange={handleChange}
                    placeholder="Enter post content"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <PhotoIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-900 hover:file:bg-gray-100"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => setFormValues({
                title: '',
                photo: null,
                content: '',
              })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
      </form>
    </div>
  );
}
