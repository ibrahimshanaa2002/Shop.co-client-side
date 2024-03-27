import React from "react";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/Footer/Footer";
import Gym from "../Pages/Browse/Gym";

const LayoutGym = () => {
  return (
    <div>
      <Navbar />
      <Gym />
      <Footer />
    </div>
  );
};

export default LayoutGym;
