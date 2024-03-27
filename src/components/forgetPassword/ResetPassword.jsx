import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ResetPassword = () => {
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/resetPassword`,
        {
          token: resetToken,
          password: password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
