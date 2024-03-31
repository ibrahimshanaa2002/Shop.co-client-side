import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import Navbar from "../components/navBar/Navbar";
import Hero from "../Pages/Hero/Hero";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark");
  };
  return (
    <div>
      <Banner />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Layout;
