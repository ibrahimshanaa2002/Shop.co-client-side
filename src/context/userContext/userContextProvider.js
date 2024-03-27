import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Check if user data exists in localStorage
  const initialUser = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(initialUser);

  // Function to set the logged-in user
  const loginUser = (userData) => {
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to logout the user
  const logoutUser = () => {
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Listen for changes in the user state and update localStorage accordingly
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
