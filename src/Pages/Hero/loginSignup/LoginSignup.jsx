import React, { useState } from "react";
import Login from "../../../components/Login/Login";
import Signup from "../../../components/Sigup/Signup";
import Banner from "../../../components/Banner/Banner";

const LoginSignup = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [showpassword, setPassword] = useState(false);
  const handlepassword = () => {
    setPassword(!showpassword);
  };

  return (
    <div>
      <div>
        {/* Render either Login or Signup component based on toggle state */}
        {toggle ? (
          <Signup
            handleToggle={handleToggle}
            handlepassword={handlepassword}
            showpassword={showpassword}
          />
        ) : (
          <Login
            handleToggle={handleToggle}
            handlepassword={handlepassword}
            showpassword={showpassword}
          />
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
