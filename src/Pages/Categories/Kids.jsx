import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import { ProductContext } from "../../context/productContext/productContextProvider";
import Loader from "./../../components/Loader/Loader";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";

const Kids = () => {
  const { filterProductsForKids, loading } = useContext(ProductContext);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      const data = filterProductsForKids();
      const shuffled = shuffleArray(data);
      setShuffledProducts(shuffled);
    }
  }, [filterProductsForKids, loading]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (loading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="w-full py-16 transition-colors duration-300 dark:bg-[rgb(18,18,18)] dark:text-white">
        <div className="flex flex-col items-center w-full gap-8 px-5 h-full">
          <div className="text-4xl font-bold">Kid's Collection</div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {shuffledProducts.map((item) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                title={item.title}
                desc={item.desc}
                img={item.img}
                newprice={item.newprice}
                oldprice={item.oldprice}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kids;
