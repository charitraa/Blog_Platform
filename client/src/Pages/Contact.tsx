import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: '01149aa1-a81d-46af-9b2c-5b2ddc9ed09b',
        }),
      });

      if (response.ok) {
        toast.success('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center py-12 px-5 bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-center gap-8 p-8 w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Contact Us</h2>
        <p className="text-lg text-center text-gray-600 max-w-lg">
          If you have any further inquiries about this app, please let us know by filling out the form below.
        </p>
        <form className="flex flex-col w-full max-w-md gap-5" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="access_key"
            value="01149aa1-a81d-46af-9b2c-5b2ddc9ed09b"
          />
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full h-11 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full h-11 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
            ></textarea>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="border-2 border-blue-600 py-2 px-6 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
