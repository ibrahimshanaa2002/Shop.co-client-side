import React from "react";
import Formal from "../Pages/Browse/Formal";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/Footer/Footer";

const LayoutFormal = () => {
  return (
    <div>
      <Navbar />
      <Formal />
      <Footer />
    </div>
  );
};

export default LayoutFormal;
