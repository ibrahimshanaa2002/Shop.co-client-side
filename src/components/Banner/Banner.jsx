import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Banner.css";
import { Link } from "react-router-dom";
import Signup from "./../Sigup/Signup";

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <div>
      {bannerVisible && (
        <div className="w-full bg-black flex items-center justify-center text-white px-6 py-4 relative animate-slideInTop">
          <div>
            <IoClose
              onClick={handleBannerClose}
              className="absolute right-4 top-4 cursor-pointer hover:text-orange-400 duration-500"
              size={20}
            />
          </div>
          <h1 className="text-sm">
            Sign up and get 0% off to your first order.
            <Link
              to={"/authentication"}
              className="font-medium text-md underline cursor-pointer hover:text-orange-300 duration-300"
            >
              Sign Up Now
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Banner;
