import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import "./NewsLetter.css";
import Aos from "aos";
import "aos/dist/aos.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/user/sendMail`, {
        Email: email, // Send the email address in the 'Email' field
      });
      setEmail("");
      setError(""); // Reset error state if submission succeeds
      alert("Email submitted successfully!");
    } catch (error) {
      setError("Please include an '@' in the email address");
      console.error("Error submitting email:", error);
    }
  };

  const handleFocus = () => {
    setError(""); // Clear error when input field is focused
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-16 transition-colors duration-300 dark:bg-[rgb(18,18,18)] ">
      <div className="sides flex justify-between items-center bg-black py-3 px-10 rounded-2xl mx-9 transition-colors duration-300 dark:bg-[rgb(30,30,30)]">
        <div
          className="left-side text-5xl font-bold text-white"
          data-aos="fade-right"
        >
          <h1 className="">STAY UP TO DATE ABOUT</h1>
          <h2 className="dark:text-orange-500">OUR LATEST OFFERS</h2>
        </div>
        <div className="right-side flex flex-col gap-2 w-1/3">
          <div className="EmailInput">
            <div className="relative ">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus} // Handle focus event
                type="email"
                id="email"
                name="email"
                className="pl-10 pr-4 border py-3 rounded-3xl w-full focus:border-transparent focus:ring-0"
                placeholder="Enter your email"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
              >
                <i>
                  <MdOutlineMail />
                </i>
              </div>
            </div>
            <div
              className={`error ${
                error ? "" : "opacity-0 transition-opacity duration-300"
              }`}
            >
              {error && (
                <div className="relative py-3">
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 pl-10 pr-4 rounded-3xl relative"
                    role="alert"
                  >
                    <strong className="font-bold">Be Warned!</strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={handleSubmitt}
            className="subscribe text-black font-semibold bg-white rounded-3xl flex justify-center items-center py-3 cursor-pointer duration-300  hover:text-white hover:bg-orange-500"
          >
            <span className=" ">Subscribe To News Letter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
