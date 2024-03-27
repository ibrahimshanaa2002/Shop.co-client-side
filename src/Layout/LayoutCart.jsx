import React from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Cart from "../Pages/Cart/Cart";
import Navbar from "../components/navBar/Navbar";
const LayoutCart = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Cart />
      <Footer />
    </div>
  );
};

export default LayoutCart;
