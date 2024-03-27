import React, { useContext } from "react";
import ProductCard from "../Cards/ProductCard";
import { ProductContext } from "../../context/productContext/productContextProvider";
import { Link } from "react-router-dom";

const TopSelling = () => {
  const { TopSellingProducts } = useContext(ProductContext); // Destructure newArrivals from context

  // Slice the newArrivals array to retrieve only the first 4 items
  const limitedNewArrivals = TopSellingProducts.slice(0, 4);

  return (
    <div className="w-full  py-16">
      <div className="flex flex-col items-center w-full gap-8 px-5 h-full">
        <div className="text-4xl font-[600] uppercase">Top Selling</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full h-full">
          {limitedNewArrivals.map((item) => (
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
        <Link
          to={"/topSelling"}
          className="px-16 py-3 rounded-full hover:bg-black hover:text-white cursor-pointer duration-300 transition-all border-[0.3px] border-black"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default TopSelling;
