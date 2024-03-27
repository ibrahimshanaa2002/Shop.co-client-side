import React from "react";
import Banner from "../components/Banner/Banner";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/Footer/Footer";
import NewArrivalsPage from "../Pages/NewArrivals/NewArrivalsPage";

const LayoutArriivals = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <NewArrivalsPage />
      <Footer />
    </div>
  );
};

export default LayoutArriivals;
