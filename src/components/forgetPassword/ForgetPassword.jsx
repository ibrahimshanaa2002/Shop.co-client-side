import React, { useState } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend API to handle the forgot password request
      const response = await axios.put(
        `${backendUrl}/api/user/resetPassword`,
        {
          email: email,
        }
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      // Handle error responses from the server
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error: Unable to send reset password request");
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgetPassword;
