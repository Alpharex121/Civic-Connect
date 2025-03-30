import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {  useSelector } from "react-redux";
const IssueDetailsModal = ({ issue, isAdmin = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: issue.status,
    },
  });

  const onSubmit = (data) => {
    const updatedIssue = { ...issue, status: data.status };
    console.log("Updated issue:", updatedIssue);
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        View Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-semibold flex-wrap text-gray-800">{issue.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500  hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-800">{issue.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{issue.location || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Pincode</p>
                  <p className="font-medium text-gray-800">{issue.pincode || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date Reported</p>
                  <p className="font-medium text-gray-800">30-05-2025</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Description</p>
                  <p className="text-gray-800">{issue.description || "No description provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      issue.status === "Open"
                        ? "bg-yellow-200 text-yellow-800"
                        : issue.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
                    
              {(user.role === "corporation" && issue.status === "Open") ||
 (user.role === "user" && issue.status === "Marked as Completed") ? (
  <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
    {user.role === "corporation" ? "Mark as Finished" : "Confirm Completion"}
  </button>
) : null}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueDetailsModal;