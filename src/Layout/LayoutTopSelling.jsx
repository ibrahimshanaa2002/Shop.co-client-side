import React from "react";
import Navbar from "../components/navBar/Navbar";
import TopSelling from "../Pages/TopSelling/TopSelling";
import Footer from "../components/Footer/Footer";

const LayoutTopSelling = () => {
  return (
    <div>
      <Navbar />
      <TopSelling />
      <Footer />
    </div>
  );
};

export default LayoutTopSelling;
