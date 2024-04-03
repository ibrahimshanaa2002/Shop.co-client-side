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
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
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
    <div className="dark:bg-[rgb(30,30,30)]">
      <div className="flex  items-center justify-around  w-full h-screen">
        <div className=" select-none lg:text-6xl md:text-3xl text-lg font-extrabold pointer-events-none w-full h-full md:flex items-center justify-center hidden dark:text-orange-500">
          SHOP.CO
        </div>

        <div className="flex items-center flex-col justify-center gap-6  w-full">
          <div className=" w-full h-full px-8 py-8">
            <div className="flex items-center justify-center py-4">
              <h1 className="font-bold text-3xl dark:text-orange-500 select-none">
                Login
              </h1>
            </div>

            <div className="w-full h-full">
              <div className="flex flex-col gap-3 pb-6">
                <span className="text-gray-700 dark:text-white select-none">
                  UserName
                </span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="dark:text-orange-500" />
                  </div>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    type="text"
                    placeholder="userName"
                    className="outline-none select-none placeholder:text-white placeholder:opacity-50 rounded-2xl block w-full py-3 pl-10 pr-3 leading-tight dark:text-white text-gray-700 border-b border-gray-200 bg-transparent peer focus:border-orange-500 focus:ring-0 transition border duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col gap-3 pb-6">
                <span className="text-gray-700 dark:text-white select-none">
                  Password
                </span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="dark:text-orange-500" />
                  </div>
                  <div className="flex items-center relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="rounded-2xl select-none block w-full placeholder:text-white placeholder:opacity-50 dark:text-white py-3 pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer focus:border-orange-500 focus:ring-0 transition border duration-300"
                    />
                    <div className="text-2xl cursor-pointer absolute right-2 duration-200 text-[#000700]">
                      {showPassword ? (
                        <IoIosEyeOff
                          onClick={handlePasswordToggle}
                          className="dark:text-white dark:opacity-85 transition-opacity duration-300 ease-in-out select-none"
                        />
                      ) : (
                        <IoMdEye
                          onClick={handlePasswordToggle}
                          className="dark:text-white dark:opacity-85 transition-opacity duration-300 ease-in-out select-none"
                        />
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
                  className="cursor-pointer duration-10 hover:underline dark:text-white select-none"
                >
                  Forgot Password?
                </Link>
              </div>
            </span>
            <span
              onClick={handleSubmit}
              className="login-button select-none flex justify-center bg-black text-white p-5 rounded-3xl cursor-pointer hover:bg-orange-500 duration-300 "
            >
              Login
            </span>

            <div className="flex items-center justify-center py-4 dark:text-white select-none">
              or signup using
            </div>
            <div className="social-icons flex justify-center gap-7 pt-3">
              <SocialIcon url="https://www.facebook.com/" />
              <SocialIcon url="https://twitter.com/" />
              <SocialIcon url="https://www.google.com/" />
            </div>

            <h3 className="flex justify-center pt-9 pointer-events-none dark:text-white select-none">
              Don't have an account?
            </h3>
            <h1
              onClick={handleToggle}
              className="flex items-center justify-center py-2 "
            >
              <span className="hover:text-orange-800 duration-300 cursor-pointer font-semibold dark:text-white dark:hover:text-orange-500 select-none">
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
