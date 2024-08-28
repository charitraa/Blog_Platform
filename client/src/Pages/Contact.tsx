import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex justify-center py-12 px-5 bg-gray-50">
      <div className="flex flex-col items-center gap-8 p-8 w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Contact Us</h2>
        <p className="text-lg text-center text-gray-600 max-w-lg">
          If you have any further inquiries about this app, please let us know by filling out the form below.
        </p>
        <form className="flex flex-col w-full max-w-md gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className="text-lg font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="w-full h-11 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className="text-lg font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
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
              type="email"
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
