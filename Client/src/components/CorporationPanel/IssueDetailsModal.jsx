import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const IssueDetailsModal = ({ issue, isAdmin = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  // React Hook Form setup for status update
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: issue.status,
    },
  });

  // Handle status update submission
  const onSubmit = (data) => {
    const updatedIssue = { ...issue, status: data.status };
    console.log('Updated issue:', updatedIssue); // Replace with API call later
    setIsOpen(false);
    if (onClose) onClose(); // Notify parent to close modal if provided
  };

  return (
    <>
      {/* View Details Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-150"
      >
        View Details
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 mx-4 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Issue #{issue.id} Details
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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

            {/* Issue Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Title</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.category || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.location || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pincode</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.pincode || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-600">Description</p>
                  <p className="mt-1 text-gray-800">{issue.description || 'No description provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <span
                    className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.status === 'Open'
                        ? 'bg-yellow-100 text-yellow-800'
                        : issue.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgency</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.urgency || 'Low'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Upvotes</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.upvotes}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Date Reported</p>
                  <p className="mt-1 text-gray-800 font-semibold">
                    {new Date(issue.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reported By</p>
                  <p className="mt-1 text-gray-800 font-semibold">{issue.reporter}</p>
                </div>
              </div>

              {/* Status Update Form (Admin Only) */}
              {isAdmin && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 tracking-wide"
                  >
                    Update Status
                  </label>
                  <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className={`mt-2 block w-full border rounded-lg shadow-sm py-3 px-4 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 ${
                      errors.status ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueDetailsModal;