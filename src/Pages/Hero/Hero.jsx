import React, { useState } from "react";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import TopSelling from "../../components/TopSelling/TopSelling";
import Browse from "../../components/Browse/Browse";
import Welcome from "../../components/Welcome/Welcome";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

const Hero = () => {


  return (
    <div className="w-full transition-colors duration-300 dark:bg-[rgb(18,18,18)]">
      {/* Welcome section */}
      <Welcome />

      {/* New Arrivals section */}
      <NewArrivals />
      <hr className="py-4 transition-colors duration-300 dark:bg-[rgb(18,18,18)]  " />

      {/* Top Selling section */}
      <TopSelling />
      <hr className="py-4 transition-colors duration-300 dark:bg-[rgb(18,18,18)]  " />

      {/* Browse section */}
      <Browse />
      <hr className="py-4 transition-colors duration-300 dark:bg-[rgb(18,18,18)]  " />

      {/* Reviews section */}
      <ReviewsCard />
      <hr className="py-4 transition-colors duration-300 dark:bg-[rgb(18,18,18)]  " />

      {/* Newsletter section */}
      <NewsLetter />
      <br />
    </div>
  );
};

export default Hero;
