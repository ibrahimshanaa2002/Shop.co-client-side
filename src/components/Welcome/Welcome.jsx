import React, { useState, useEffect, useMemo, useContext } from "react";
import "./Welcome.css";
import StatisticCard from "../Cards/StaticCard/StaticCard";
import personImage from "../../assets/Background/bg-persons.png";
import Brand1 from "../../assets/Brands/Brand1.png";
import Brand2 from "../../assets/Brands/Brand2.png";
import Brand3 from "../../assets/Brands/Brand3.png";
import Brand4 from "../../assets/Brands/Brand4.png";
import Brand5 from "../../assets/Brands/Brand5.png";
import { UserContext } from "../../context/userContext/userContextProvider";
import Dtom from "./Dtom";
import Aos from "aos";
import { ProductContext } from "../../context/productContext/productContextProvider";

const Welcome = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductContext);

  const nbProducts = products.reduce((total, product) => total + 1, 0);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const brands = useMemo(() => [Brand1, Brand2, Brand3, Brand4, Brand5], []);

  return (
    <>
      <div className="bg-image bg-cover bg-center h-full flex justify-start items-start flex-col w-full p-12  transition-all duration-300 ">
        <div className="left-container flex justify-start flex-col xl:w-[50%] py-12 sm:w-[50%]">
          {user ? (
            <h1
              className="font-extrabold text-8xl xl:py-9 xl:w-[70%] flex sm:w-full pb-4 title up"
              data-aos="fade-right"
            >
              Welcome, {user.username}!
            </h1>
          ) : (
            <h1
              className="font-extrabold text-8xl xl:py-9 xl:w-[70%] flex sm:w-full pb-4 title"
              data-aos="fade-right"
            >
              FIND CLOTHES THAT MATCH YOUR STYLE
            </h1>
          )}
          <p
            className="xl:w-[65%] text-2xl pb-8 sm:w-full description"
            data-aos="fade-right"
          >
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div data-aos="fade-right">
            <Dtom />
          </div>
        </div>
        <div className="w-[50%] static-cards">
          <StatisticCard nbProducts={nbProducts} />
        </div>
      </div>
      <div className="mobile flex flex-col-reverse">
        <div className="brands flex flex-row bg-black justify-around h-full w-full flex-wrap align-center items-center gap-8 p-6 ">
          {brands.map((brand, index) => (
            <img
              data-aos="flip-left"
              key={index}
              src={brand}
              alt={`Brand ${index}`}
              className="h-10 brand"
            />
          ))}
        </div>

        {/* Lazy load the image for small screens */}
        {isSmallScreen && (
          <img
            src={personImage}
            alt=""
            className="personImage w-full"
            loading="lazy"
          />
        )}
      </div>
    </>
  );
};

export default Welcome;
