import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../public/vite.svg';
import { register } from '../Axois/auth';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dob?: string;
  username?: string;
  email?: string;
  password?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dob: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.firstName) newErrors.firstName = 'First name is required';

  if (!formData.lastName) newErrors.lastName = 'Last name is required';
  if (!formData.dob) {
    newErrors.dob = 'Date of Birth is required';
  } else {
    const dob = new Date(formData.dob);
    const today = new Date();

    if (dob > today) {
      newErrors.dob = 'Date of Birth cannot be in the future';
    } else {
      const ageDiffMs = today.getTime() - dob.getTime();
      const ageDate = new Date(ageDiffMs); 
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      }
    }
  }

  if (!formData.username) newErrors.username = 'Username is required';

  if (!formData.email) newErrors.email = 'Email is required';

  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters long';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await register(
          formData.firstName, formData.lastName, formData.username, formData.dob, formData.email, formData.password
        );

        if (result) {
          toast.success('Signup successful!');
          setTimeout(() => {
            navigate('/login');
          }, 1000)
        } else {
          toast.error('Signup failed.');
        }
      } catch (err: any) {
        toast.error(`Error: ${err.response.data.email}`);
      }
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesignin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img src={img} alt="" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account? <a href="#" className="text-indigo-600 hover:underline" onClick={handlesignin}>Sign in</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
