import React, { useEffect, useState } from "react";
import dummyData from "../../data/issues.json"; // Adjust path based on your project structure
import IssueDetailsModal from "./IssueDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { addIssue } from "../../store/Slices/issueSlice";
import { api } from "../../utils/constants";
// Sub-component for displaying the list of issues
const IssueList = ({ issues }) => {
  if (issues?.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6">No issues reported yet.</p>
    );
  }

  return (
    <div className="m-8">
      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Issue ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Date Reported
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {issues?.map((issue) => (
            <tr
              key={issue.id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {issue.issueId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {issue.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {issue.category || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {issue.location || "Not specified"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    issue.status === "Open"
                      ? "bg-yellow-100 text-yellow-800"
                      : issue.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {issue.status}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                30-03-25
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <IssueDetailsModal issue={issue} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main CorporationPanel component
const CorporationPanel = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all"); // Filter state
  const issueList = useSelector((store) => store?.issues?.issues);
  const issues = issueList[0]; // Fetch from issues.json for now

  const getIssueData = async () => {
    try {
      // Replace with backend authentication logic later
      const response = await api("http://localhost:3000/issue/issues");

      const jsonData = response.data;

      if (response.status === 200 && response.data) {
        console.log("Issue fetched Successfully");
        dispatch(addIssue(jsonData));
      }
    } catch (error) {
      console.log("Error occured while logging in." + error);
    }
  };

  useEffect(() => {
    issueList.length === 0 && getIssueData();
  }, []);

  // Filter issues based on the active tab
  const filteredIssues =
    activeTab === "all"
      ? issues
      : issues.filter((issue) => issue.status.toLowerCase() === activeTab);

  return (
    <div className="m-8 px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Corporation Panel
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Manage and track all reported municipal issues efficiently.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "all"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({issues?.length})
          </button>
          <button
            onClick={() => setActiveTab("open")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "open"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Open (
            {issues?.filter((i) => i?.status?.toLowerCase() === "open")?.length}
            )
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "in-progress"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            In Progress (
            {
              issues?.filter((i) => i?.status?.toLowerCase() === "in-progress")
                .length
            }
            )
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "resolved"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Resolved (
            {
              issues?.filter((i) => i?.status?.toLowerCase() === "resolved")
                .length
            }
            )
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
          Reported Issues
        </h2>
        <IssueList issues={filteredIssues} />
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>Working together to improve our community, one issue at a time.</p>
      </footer>
    </div>
  );
};

export default CorporationPanel;
