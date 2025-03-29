import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="fixed top-0 w-full flex justify-between bg-gradient-to-r from-[#022B50] to-[#101117] z-10 text-white px-5 h-12 items-center">
      
      <div className="font-bold text-2xl">
        <Link to="/">
        <h1>CivicConnect</h1>
        </Link>
      </div>
      
      <div className="px-3 flex justify-center font-semibold">
        <button className="w-full px-3 my-1 rounded-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200">
          <Link to = "/sign-in">
          Sign in
          </Link>
          
        </button>
      </div>

    </div>
  );
};

export default Header;