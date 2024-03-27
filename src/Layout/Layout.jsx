import React from "react";
import Banner from "../components/Banner/Banner";
import Navbar from "../components/navBar/Navbar";
import Hero from "../Pages/Hero/Hero";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Layout;
