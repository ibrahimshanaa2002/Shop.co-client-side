import React from "react";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/Footer/Footer";
import Party from "../Pages/Browse/Party";

const LayoutParty = () => {
  return (
    <div>
      <Navbar />
      <Party />
      <Footer />
    </div>
  );
};

export default LayoutParty;
