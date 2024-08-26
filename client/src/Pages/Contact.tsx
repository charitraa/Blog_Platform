import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex justify-center py-12 px-5">
      <div className="flex flex-col items-center gap-8 p-12 w-full max-w-3xl">
        <div className="text-4xl font-bold text-center">Contact Us</div>
        <div className="text-lg text-center max-w-lg">
          If you have any further inquiries, please let us know by filling the form below.
        </div>
        <form className="flex flex-col w-full max-w-md gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-medium">First Name</label>
              <input className="w-full h-11 p-3 rounded-lg border border-gray-300" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-medium">Last Name</label>
              <input className="w-full h-11 p-3 rounded-lg border border-gray-300" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Email</label>
            <input className="w-full h-11 p-3 rounded-lg border border-gray-300" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Message</label>
            <textarea className="w-full h-24 p-3 rounded-lg border border-gray-300"></textarea>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="border-2 border-blue-600 py-2 px-4 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
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
