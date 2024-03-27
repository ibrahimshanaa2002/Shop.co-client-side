import axios from "axios";
import React, { useContext, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { UserContext } from "../../context/userContext/userContextProvider";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Login = ({ handleToggle, handlepassword, showpassword }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  setTimeout(() => {
    setError("");
  }, 5000);
  const handleKeyDown = (event) => {
    // Prevent typing space character
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        username: username,
        password: password,
      });
      console.log("User logged in:", response.data);
      const userData = response.data;
      loginUser(userData);
      setUserName("");
      setPassword("");
      setError("");

      navigate("/"); // Redirect to the / route
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        error.response.data.message ||
          "Check if the account username or password was typed correctly"
      ); // Set the error message received from the server
    }
  };

  return (
    <div className="">
      <div className="flex  items-center justify-around  w-full h-screen">
        <div className="lg:text-6xl md:text-3xl text-lg font-extrabold pointer-events-none w-full h-full md:flex items-center justify-center hidden">
          SHOP.CO
        </div>

        <div className="flex items-center flex-col justify-center gap-6  w-full">
          <div className=" w-full h-full px-8 py-8">
            <div className="flex items-center justify-center py-4">
              <h1 className="font-bold text-3xl">Login</h1>
            </div>

            <div className="w-full h-full">
              <div className="block pb-6">
                <span className="text-gray-700">UserName</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser />
                  </div>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    type="text"
                    placeholder="userName"
                    className="outline-none rounded-2xl block w-full py-3 pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer focus:border-black focus:ring-0"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <div className="block pb-6">
                <span className="text-gray-700">Password</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock />
                  </div>
                  <div className="flex items-center relative">
                    <input
                      value={password}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type={`${showpassword ? "text" : "password"}`}
                      placeholder="password"
                      className="rounded-2xl block w-full py-3 pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer focus:border-black focus:ring-0"
                    />
                    <div className="text-2xl cursor-pointer absolute right-2 duration-200 text-[#000700]">
                      {showpassword ? (
                        <IoIosEyeOff onClick={handlepassword} />
                      ) : (
                        <IoMdEye onClick={handlepassword} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="flex justify-between pb-5 items-center">
              <div>
                {error && <span className="text-red-500">{error}</span>}
              </div>
              <div>
                <Link
                  to={"/forget-password"}
                  className="cursor-pointer duration-10 hover:font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </span>
            <span
              onClick={handleSubmit}
              className="login-button flex justify-center bg-black text-white p-5 rounded-3xl cursor-pointer hover:bg-orange-400 duration-300 "
            >
              Login
            </span>

            <div className="flex items-center justify-center py-4">
              or signup using
            </div>
            <div className="social-icons flex justify-center gap-7 pt-3">
              <SocialIcon url="https://www.facebook.com/" />
              <SocialIcon url="https://twitter.com/" />
              <SocialIcon url="https://www.google.com/" />
            </div>

            <h3 className="flex justify-center pt-9 pointer-events-none">
              Don't have an account?
            </h3>
            <h1
              onClick={handleToggle}
              className="flex items-center justify-center py-2 "
            >
              <span className="hover:text-orange-800 duration-300 cursor-pointer font-semibold">
                Sign Up
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
