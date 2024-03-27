import React from "react";
import Navbar from "./../components/navBar/Navbar";
import Product from "../Pages/Product/Product";
import Footer from "./../components/Footer/Footer";

const LayoutProduct = () => {
  return (
    <div>
      <Navbar />
      <Product />
      <Footer />
    </div>
  );
};

export default LayoutProduct;
