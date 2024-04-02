import React, { useState } from "react";
import { FaCheckCircle, FaLock, FaUser } from "react-icons/fa";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

import { SocialIcon } from "react-social-icons";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Signup = ({ handleToggle, handlepassword, showpassword }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    digit: false,
  });
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    // Prevent typing space character
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleValidation = (value) => {
    const validationsCopy = { ...validations };
    validationsCopy.length = value.length >= 8;
    validationsCopy.uppercase = /[A-Z]/.test(value);
    validationsCopy.lowercase = /[a-z]/.test(value);
    validationsCopy.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    validationsCopy.digit = /\d/.test(value);
    validationsCopy.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Use email directly here
    setValidations(validationsCopy);
  };

  const handleUsernameValidation = (value) => {
    const isValid = /^[a-zA-Z0-9_]{5,}$/.test(value); // Minimum 3 characters, alphanumeric and underscore
    setUsernameError(
      isValid
        ? ""
        : "Username must be at least 5 characters long and contain only letters, numbers, and underscores"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError("You must fill all the fields");
      return;
    }

    if (!validations.email) {
      setError("Please enter a valid email address");
      return;
    }

    for (const validation of Object.values(validations)) {
      if (!validation) {
        setError("Password does not meet requirements");
        return;
      }
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/signup`, {
        username: username,
        email: email,
        password: password,
      });
      console.log("User created:", response.data);
      setUserName("");
      setEmail("");
      setPassword("");
      setError("");
      navigate("/authentication");
      handleToggle();
    } catch (error) {
      setError("Username or Email is already in use.");
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex  items-center justify-around  w-full h-screen">
          <div className="lg:text-6xl md:text-3xl text-lg font-extrabold pointer-events-none w-full h-full md:flex items-center justify-center hidden">
            SHOP.CO
          </div>

          <div className="flex items-center flex-col justify-center gap-6  w-full">
            <div className=" w-full h-full px-8 py-8">
              <div className="flex items-center justify-center py-4">
                <h1 className="font-bold text-3xl">Sign Up</h1>
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
                      onFocus={() => setUsernameError("")}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        handleUsernameValidation(e.target.value);
                      }}
                      required
                      type="text"
                      placeholder="Username"
                      className="outline-none rounded-2xl block w-full py-3  pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer focus:border-black focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="block pb-6">
                  <span className="text-gray-700">Email</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser />
                    </div>
                    <input
                      required
                      value={email}
                      onFocus={() => setError("")}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="Email"
                      className="outline-none focus:border-black focus:ring-0 rounded-2xl block w-full py-3  pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer"
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
                        required
                        onFocus={() => setError("")}
                        value={password}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          handleValidation(e.target.value);
                        }}
                        type={`${showpassword ? "text" : "password"}`}
                        placeholder="Password"
                        className="outline-none focus:border-black focus:ring-0  rounded-2xl block w-full py-3  pl-10 pr-3 leading-tight text-gray-700 border-b border-gray-200 bg-transparent peer"
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
                  <div className="relative pt-5">
                    <ul>
                      <li className="flex items-center">
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCheckCircle
                            className={
                              validations.length
                                ? "text-green-500 duration-300"
                                : "text-gray-700"
                            }
                          />
                          <div className="pl-2">
                            Password must be at least{" "}
                            <span className="font-bold">8 characters long</span>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCheckCircle
                            className={
                              validations.uppercase
                                ? "text-green-500 duration-300"
                                : "text-gray-700"
                            }
                          />
                          <div className="pl-2">
                            Password must contain at least one{" "}
                            <span className="font-bold">uppercase letter</span>
                          </div>
                        </div>
                      </li>

                      <li className="flex items-center">
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCheckCircle
                            className={
                              validations.lowercase
                                ? "text-green-500 duration-300"
                                : "text-gray-700"
                            }
                          />
                          <div className="pl-2">
                            Password must contain at least one{" "}
                            <span className="font-bold">lowercase letter</span>
                          </div>
                        </div>
                      </li>

                      <li className="flex items-center">
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCheckCircle
                            className={
                              validations.specialChar
                                ? "text-green-500 duration-300"
                                : "text-gray-700"
                            }
                          />
                          <div className="pl-2">
                            Password must contain at least one{" "}
                            <span className="font-bold">special character</span>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCheckCircle
                            className={
                              validations.digit
                                ? "text-green-500 duration-300"
                                : "text-gray-700"
                            }
                          />
                          <div className="pl-2">
                            Password must contain at least one{" "}
                            <span className="font-bold">digit</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="h-1">
                      {usernameError && (
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MdError className="text-red-900 text-md" />
                          <div className="pl-2">
                            <span className="text-red-500 animate-pulse">
                              {usernameError}
                            </span>
                          </div>
                        </div>
                      )}
                      {error && (
                        <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MdError className="text-red-900 text-md" />
                          <div className="pl-2">
                            <span className="text-red-500 animate-pulse">
                              {error}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <span className="flex justify-end pb-5 ">
                <Link
                  to={""}
                  className="cursor-pointer duration-10 hover:font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </span>
              <div
                onClick={handleSubmit}
                className="login-button flex justify-center bg-black text-white p-5 rounded-3xl cursor-pointer hover:bg-orange-400 duration-300"
              >
                Sign up
              </div>
              {/* <div className="flex items-center justify-center py-4">
                or signup using
              </div>
              <div className="social-icons flex justify-center gap-7 pt-3">
                <SocialIcon url="https://www.facebook.com/" />
                <SocialIcon url="https://twitter.com/" />
                <SocialIcon url="https://www.google.com/" />
              </div> */}

              <h3 className="flex justify-center pt-9 pointer-events-none">
                Already having an account?
              </h3>
              <h1
                onClick={handleToggle}
                className="flex items-center justify-center py-2 "
              >
                <span className="hover:text-orange-800 duration-300 cursor-pointer font-semibold ">
                  Login
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
