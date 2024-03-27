import React from "react";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/Footer/Footer";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Banner from "./../components/Banner/Banner";

const LayoutAllProducts = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <AllProducts />
      <Footer />
    </div>
  );
};

export default LayoutAllProducts;
