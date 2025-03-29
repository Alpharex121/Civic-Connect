import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/Slices/userSlice";
import { api } from "../utils/constants";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const handleLogout = async () => {
    try {
      const response = await api.post("http://localhost:3000/auth/logout");
      console.log(response);
      if (response.status === 200) {
        console.log("User Logged Out Successfully");
        dispatch(removeUser());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      console.log("Error occured while logging out.");
    }
  };

  const getUserData = async () => {
    try {
      const response = await api("http://localhost:3000/auth");
      if (response.status === 200 && response.data.name) {
        dispatch(addUser(response.data));
      }
    } catch (error) {
      console.log(user);
      console.log(error);
    }
  };

  useEffect(() => {
    !user && getUserData();
  }, [user]);

  return (
    <div className="fixed top-0 w-full flex justify-between bg-gradient-to-r from-[#022B50] to-[#101117] z-10 text-white px-5 h-12 items-center">
      <div className="font-bold text-2xl">
        <Link to="/">
          <h1>CivicConnect</h1>
        </Link>
      </div>

      <div className="px-3 flex justify-center font-semibold">
        {user ? (
          <button className="w-full px-3 my-1 rounded-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200">
            <Link to="/signin" onClick={handleLogout}>
              Logout
            </Link>
          </button>
        ) : (
          <button className="w-full px-3 my-1 rounded-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200">
            <Link to="/signin">Login </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
