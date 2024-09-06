import React, { useState, ChangeEvent, FormEvent } from "react";

const provincesAndDistricts: Record<string, string[]> = {
  "Province 1": ["Jhapa", "Ilam", "Panchthar", "Taplejung", "Sankhuwasabha", "Tehrathum", "Dhankuta", "Bhojpur", "Khotang", "Okhaldhunga", "Solukhumbu", "Udayapur"],
  "Province 2": ["Saptari", "Siraha", "Dhanusha", "Mahottari", "Sarlahi", "Rautahat", "Bara", "Parsa", "Chhathapur", "Khairahani", "Koshi", "Bara", "Rautahat"],
  "Bagmati": ["Kathmandu", "Lalitpur", "Bhaktapur", "Sindhupalchok", "Dolakha", "Ramechhap", "Kavrepalanchok", "Makwanpur", "Sindhuli", "Nuwakot", "Dhading", "Rasuwa"],
  "Gandaki": ["Pokhara", "Kaski", "Lamjung", "Tanahu", "Gorkha", "Syangja", "Baglung", "Parbat", "Mustang", "Manang", "Myagdi"],
  "Lumbini": ["Lumbini", "Rupandehi", "Kapilvastu", "Nawalparasi", "Palpa", "Arghakhanchi", "Gulmi", "Syanja", "Dang", "Banke", "Bardiya", "Kailali", "Kanchanpur"],
  "Karnali": ["Surkhet", "Dailekh", "Jumla", "Mugu", "Kalikot", "Humla", "Rukum", "Salyan", "Dolpa", "Jajarkot"],
  "Sudurpashchim": ["Doti", "Achham", "Bajura", "Bajhang", "Kailali", "Kanchanpur", "Dadeldhura", "Baitadi", "Darchula", "Mahakali"],
};

const ProfileEdit: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setDistrictOptions(provincesAndDistricts[province] || []);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="province" className="block text-sm font-medium leading-6 text-gray-900">
                Province
              </label>
              <div className="mt-2">
                <select
                  id="province"
                  name="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a province</option>
                  {Object.keys(provincesAndDistricts).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                District
              </label>
              <div className="mt-2">
                <select
                  id="district"
                  name="district"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={!selectedProvince}
                >
                  <option value="">Select a district</option>
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-locality"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button type="submit" className="text-sm font-semibold leading-6 text-indigo-600">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
