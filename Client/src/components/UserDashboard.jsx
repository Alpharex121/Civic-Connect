import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyData from "../data/issues.json"; // Adjust path based on your project structure
import RaiseIssueModal from "./RaiseIssueModal";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../utils/constants";
import { addIssue } from "../store/Slices/issueSlice";

// Sub-component for displaying the list of reported issues
const IssueList = ({ issues }) => {
  if (issues?.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        You haven’t reported any issues yet. Click "Raise an Issue" to get
        started!
      </p>
    );
  }
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Issue Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Reported
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {issues?.map((issue) => (
          <tr
            key={issue?.id}
            className="hover:bg-gray-50 transition duration-200"
          >
            <td className="px-6 py-4 whitespace-nowrap">{issue?.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{issue?.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  issue?.status === "Open"
                    ? "bg-yellow-100 text-yellow-800"
                    : issue?.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {issue?.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{"30-03-2025"}</td>

            <td className="px-6 py-4 whitespace-nowrap">
              <Link
                to={`/issue/${issue?.issueId}`}
                className="text-indigo-600 hover:text-indigo-900 transition duration-150"
              >
                View Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Sub-component for displaying issue category cards
const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white shadow  rounded-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105">
      <img src={category.icon} alt={category.name} className="w-16 h-16 mb-2" />
      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
      <p className="text-sm text-gray-500 text-center">
        {category.description}
      </p>
    </div>
  );
};

// User Card Component with hardcoded data
const UserCard = () => {
  const user = useSelector((state) => state?.user?.user);
  let userData;
  if (!user) {
    userData = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinDate: "March 2025",
    };
  } else {
    userData = {
      name: user?.name,
      email: user?.email,
      joinDate: "March 2025",
    };
  }

  useEffect(() => {}, [user]);
  return (
    <div className="container m-3 mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between mb-6 animate-slide-in-left">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 border-2 border-indigo-200">
            <span className="text-2xl font-bold text-indigo-700">
              {userData.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.name}
            </h2>
            <p className="text-gray-500">{userData.email}</p>
            <div className="mt-1 flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                Verified
              </span>
              <span className="text-sm text-gray-500">
                Member since {userData.joinDate}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <button className="flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Profile
          </button>
          <button className="flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </button>
          <button className="flex cursor-pointer items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <RaiseIssueModal />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main UserDashboard component
const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const issuesList = useSelector((state) => state?.issues?.issues);
  let issues = issuesList; // Dummy issues data
  const [categories] = useState(dummyData.categories); // Dummy categories data
  const [activeTab, setActiveTab] = useState("all"); // State for filtering issues by status

  // Filter issues based on the active tab

  const getIssueList = async () => {
    try {
      const response = await api(
        "http://localhost:3000/issue/issues/" + user?.username
      );
      dispatch(addIssue(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(issuesList);
    issuesList?.length === 0 && user?.name && getIssueList();
  }, [user, issuesList]);

  const filteredIssues =
    activeTab === "all"
      ? issues
      : issues?.filter((issue) => issue?.status?.toLowerCase() === activeTab);

  return (
    <div className=" m-8 px-4 py-8 animate-fade-in">
      {/* User Card */}
      <UserCard />

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-gray-900 ml-7 mt-6">
        Welcome back, {user?.name}. You’ve reported {issuesList[0]?.length}{" "}
        issues so far.
      </h1>

      {/* Reported Issues Section */}
      <section className="mt-8 m-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          My Reported Issues
        </h2>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-md cursor-pointer text-sm font-medium transition duration-150 ${
              activeTab === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All ({issuesList[0]?.length})
          </button>
          <button
            onClick={() => setActiveTab("open")}
            className={`px-3 py-1 rounded-md  cursor-pointer text-sm font-medium transition duration-150 ${
              activeTab === "open"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Open (
            {
              issues?.filter((i) => i?.status?.toLowerCase() === "pending")
                ?.length
            }
            )
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-3 py-1 rounded-md text-sm  cursor-pointer font-medium transition duration-150 ${
              activeTab === "in-progress"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            In Progress (
            {
              issues?.filter((i) => i?.status?.toLowerCase() === "in-progress")
                ?.length
            }
            )
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`px-3 py-1 rounded-md text-sm cursor-pointer font-medium transition duration-150 ${
              activeTab === "resolved"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Resolved (
            {
              issues?.filter((i) => i?.status?.toLowerCase() === "resolved")
                ?.length
            }
            )
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <IssueList issues={issuesList[0]} />
        </div>
      </section>

      {/* Issue Categories Section */}
      <section className="mt-8">
        <h2 className="text-2xl ml-8 font-semibold text-gray-900">
          Types of Issues You Can Report
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500">
        <p>
          Your reports are anonymous and help improve your community. Thank you
          for contributing!
        </p>
      </footer>
    </div>
  );
};

export default UserDashboard;
