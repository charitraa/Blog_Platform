import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../useHook/User";
import axiosInstance from "../Axois/Axois";
import { useNavigate } from "react-router-dom";

const districts: string[] = [
  "Jhapa", "Ilam", "Panchthar", "Taplejung", "Sankhuwasabha", "Tehrathum", "Dhankuta", "Bhojpur", "Khotang", 
  "Okhaldhunga", "Solukhumbu", "Udayapur", "Saptari", "Siraha", "Dhanusha", "Mahottari", "Sarlahi", 
  "Rautahat", "Bara", "Parsa", "Kathmandu", "Lalitpur", "Bhaktapur", "Sindhupalchok", "Dolakha", "Ramechhap", 
  "Kavrepalanchok", "Makwanpur", "Sindhuli", "Nuwakot", "Dhading", "Rasuwa", "Pokhara", "Kaski", "Lamjung", 
  "Tanahu", "Gorkha", "Syangja", "Baglung", "Parbat", "Mustang", "Manang", "Myagdi", "Lumbini", "Rupandehi", 
  "Kapilvastu", "Nawalparasi", "Palpa", "Arghakhanchi", "Gulmi", "Dang", "Banke", "Bardiya", "Kailali", 
  "Kanchanpur", "Surkhet", "Dailekh", "Jumla", "Mugu", "Kalikot", "Humla", "Rukum", "Salyan", "Dolpa", 
  "Jajarkot", "Doti", "Achham", "Bajura", "Bajhang", "Dadeldhura", "Baitadi", "Darchula", "Mahakali",
];

interface User {
  username: string;
  bio: string;
  first_name: string;
  last_name: string;
  email: string;
  district: string;
  city: string;
  password: string;
}

const ProfileEdit: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [parsedUser, setParsedUser] = useState<User | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ district?: string; city?: string; password?: string }>({});

  useEffect(() => {
    if (user) {
      setParsedUser(user);
      setSelectedDistrict(user.district || "");
      setCity(user.city || "");
    }
  }, [user]);

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    setErrors((prev) => ({ ...prev, district: "" }));
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setErrors((prev) => ({ ...prev, city: "" }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: { district?: string; city?: string; password?: string } = {};

    if (!selectedDistrict) {
      newErrors.district = "District is required.";
      valid = false;
    }

    if (!city) {
      newErrors.city = "City is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;
    const updatedData = {
      district: selectedDistrict,
      city,
      first_name: parsedUser?.first_name,
      last_name: parsedUser?.last_name,
      email: parsedUser?.email,
    };

    try {
      const response = await axiosInstance.put("/user/profile/update/", updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        toast.success("Profile updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }
      ,1000)
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    navigate("/profile"); // Adjust this to your desired cancel behavior
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="p-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* Profile Info Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={parsedUser?.username || ""}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Bio
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={parsedUser?.bio || ""}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={parsedUser?.first_name || ""}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>

              {/* Last Name */}
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={parsedUser?.last_name || ""}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>

              {/* Email Address */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={parsedUser?.email || ""}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>

              {/* District */}
              <div className="col-span-full">
                <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                >
                  <option value="">Select your district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && <p className="text-red-600">{errors.district}</p>}
              </div>

              {/* City */}
              <div className="col-span-full">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                />
                {errors.city && <p className="text-red-600">{errors.city}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
