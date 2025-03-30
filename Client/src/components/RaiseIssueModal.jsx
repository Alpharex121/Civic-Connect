import React, { useState } from "react";
import { api } from "../utils/constants";
import { addUser } from "../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import issueSlice, { addIssue, updateIssue } from "../store/Slices/issueSlice";

const RaiseIssueModal = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  let issueList = useSelector((store) => store?.issues?.issues);
  const [formData, setFormData] = useState({
    pincode: "",
    title: "",
    description: "",
    location: "",
    category: "",
    file: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file drop/upload
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData); // Replace with actual submission logic

      const response = await api.post(
        "http://localhost:3000/issue/addissue",
        formData
      );
      const jsonData = response.data;
      console.log(jsonData);
      if (response.status === 200 && response.data.title) {
        console.log("Issue reported Successfully");
        dispatch(updateIssue(response.data));
        setIsOpen(false); // Close modal after submission
      } else {
        console.log("Issue not reported");
      }
    } catch (error) {
      console.log("Error occured while reporting." + error);
    }

    setFormData({
      pincode: "",
      title: "",
      description: "",
      location: "",
      category: "",
      file: null,
    }); // Reset form
  };

  return (
    <>
      {/* Raise an Issue Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Raise Issue
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 mx-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Raise a New Issue
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Horizontal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Issue Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Issue Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Pothole on Main Street"
                  required
                />
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the issue in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pincode */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 123456"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Issue Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Road Issues">Road Issues</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Public Utilities">Public Utilities</option>
                  </select>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Near Central Park, XYZ City"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Document/Image (Optional)
                  </label>
                  <div
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {formData.file ? (
                      <p className="text-sm text-gray-500">
                        {formData.file.name}
                      </p>
                    ) : (
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          Drag and drop or{" "}
                          <label
                            htmlFor="file-upload"
                            className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            browse
                          </label>
                        </p>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileDrop}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RaiseIssueModal;
