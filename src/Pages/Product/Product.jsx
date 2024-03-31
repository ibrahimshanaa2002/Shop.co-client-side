import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import "./Product.css";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/productContext/productContextProvider";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { MdError } from "react-icons/md";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const convertColorToHex = (colorName) => {
  const tempColor = document.createElement("div");
  tempColor.style.color = colorName;
  document.body.appendChild(tempColor);
  const computedColor = window.getComputedStyle(tempColor).color;
  document.body.removeChild(tempColor);
  return computedColor;
};
const Product = () => {
  const { productId } = useParams(); // Fetching product ID from URL
  const { products } = useContext(ProductContext); // Getting products from context
  const product = products.find((e) => e._id === productId); // Finding the current product
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState("");

  // Function to select color
  const selectColor = (color) => {
    setSelectedColor(color);
  };
  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  // Function to check if color is white
  const isWhite = (color) => {
    return color.toLowerCase() === "white";
  };
  // State and functions for quantity
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  // Function to add item to cart
  const addToCart = async () => {
    try {
      // Validating selection and quantity
      if (!selectedColor || !selectedSize || count <= 0) {
        setError("Please select color, size, and quantity");
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }

      // Getting user token from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      const userToken = userData ? userData.token : null;

      // Ensure user token is available
      if (!userToken) {
        // Redirecting to authentication if user token is not available
        setError("You must Sign In or Sign Up");
        return;
      }

      // Data to send to the server
      const data = {
        quantity: count,
        size: selectedSize,
        color: selectedColor,
      };

      // Making POST request to add item to cart
      await axios.post(`${backendUrl}/api/cart/addToCart/${productId}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      // Store cart data in local storage
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      updatedCart.push({
        productId,
        quantity: count,
        size: selectedSize,
        color: selectedColor,
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setSuccessMessage("Product added to cart successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Loading spinner while product is loading
  if (!product) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="main w-full h-full items-center flex justify-around gap-6 p-10 transition-colors duration-300 dark:bg-[rgb(18,18,18)] dark:text-white  ">
      {/* Left container */}
      <div className="left-container w-[40%]  flex justify-center gap-6">
        {/* Big product image */}
        <div className="big-image img-hover-zoom ">
          <img
            src={product.img}
            alt="Brand 1"
            className="h-[56vh] lg:h-[55vh] xl:h-[80vh]  w-auto  xl:w-auto hover:cursor-pointer"
          />
        </div>
        {/* Column of small product images */}
        {/* <div className="column-img px-2 h-full justify-between  flex flex-col overflow-auto gap-3">
          <img
            src={product.img}
            alt=""
            className="border h-[30%] w-full rounded-xl hover:border-black duration-100 hover:cursor-pointer  "
          />
          <img
            src={product.img}
            alt=""
            className=" border  h-[30%] w-full rounded-xl hover:border-black duration-100 hover:cursor-pointer"
          />
          <img
            src={product.img}
            alt=""
            className=" border  h-[30%] w-full rounded-xl hover:border-black duration-100 hover:cursor-pointer"
          />
          <img
            src={product.img}
            alt=""
            className=" border  h-[30%] w-full rounded-xl hover:border-black duration-100 hover:cursor-pointer"
          />
          <img
            src={product.img}
            alt=""
            className=" border  h-[30%] w-full rounded-xl hover:border-black duration-100 hover:cursor-pointer"
          />
        </div> */}
      </div>
      {/* Right container */}
      <div className="right-container w-[60%] h-full flex flex-col  justify-center">
        {/* Product title */}
        <h1 className="text-5xl font-extrabold uppercase title">
          {product.title}
        </h1>
        {/* Product rating */}
        <div className="Main-starts flex justify-start items-center text-center gap-3 py-5">
          <div className="stars flex text-yellow-400 text-2xl">
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
          </div>
          <div className="rate">4.5/ 5</div>
        </div>
        {/* Product prices and discount */}
        <div className="price-container flex justify-start items-center gap-4">
          <div className="price">
            <h1 className="font-bold text-3xl">${product.newprice}</h1>
          </div>
          <div className="old-price">
            <h1 className="font-bold text-3xl text-gray-400 line-through">
              ${product.oldprice}
            </h1>
          </div>
          <div className="discount">
            <h1 className="bg-red-100 text-[#FF3333] rounded-3xl px-5 py-1">
              40%
            </h1>
          </div>
        </div>
        {/* Product description */}
        <div className="product-desc border-b-2 py-2">
          <p className="py-5">{product.desc}</p>
        </div>
        {/* Color selection */}
        <div className="color-container border-b-2 py-2">
          <h1>Select Color</h1>
          <div className="colors-circle py-5 gap-2 flex flex-wrap  items-center ">
            {product.color.map((color, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full border border-gray-400 cursor-pointer relative ${
                  selectedColor === color
                    ? "border-2 border-white dark:border-orange-500 opacity-70"
                    : ""
                } transition duration-300 ease-in-out mb-2 sm:mb-0 sm:mr-2`}
                onClick={() => selectColor(color)}
                style={{
                  backgroundColor: color,
                  color: isWhite(color) ? "black" : convertColorToHex(color),
                }}
              >
                {selectedColor === color && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FaCheck
                      className={`w-4 h-4 ${
                        isWhite(color) ? "text-black" : "text-white"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Size selection */}
        <div className="size-container border-b-2 py-2">
          <h1>Select Size</h1>
          <div className="sizes flex flex-wrap gap-2 md:gap-4 py-2 uppercase">
            {product.size.map((size, index) => (
              <div
                key={index}
                onClick={() => handleSizeClick(size)}
                className={`py-2 px-4 hover:bg-gray-200 border rounded-xl cursor-pointer ${
                  selectedSize === size
                    ? "bg-black dark:bg-orange-500 dark:font-semibold text-white"
                    : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        {/* Error message */}
        <div className="py-2 relative h-1">
          {error && (
            <div className="inset-y-0 left-0 flex items-center pointer-events-none">
              <MdError className="text-red-900 text-md" />
              <div className="pl-2">
                <span className="text-red-500 animate-pulse">{error}</span>
              </div>
            </div>
            
          )}  {successMessage && (
            <div className="inset-y-0 left-0 flex items-center pointer-events-none">
              <MdError className="text-green-800 text-md" />
              <div className="pl-2">
                <span className="text-green-500 animate-pulse">
                  {successMessage}
                </span>
              </div>
            </div>
          )}
          
        </div>
        {/* Success message */}
       

        {/* Quantity counter */}
        <div className="Counter flex text-center items-center w-full py-5 gap-4 dark:text-black">
          {/* Counter buttons */}
          <div className="counter-container w-[30%]  bg-[#F0F0F0] rounded-full gap-5 p-3 flex items-center justify-around">
            <div className="Negative">
              <button className=" text-3xl" onClick={decrementCount}>
                -
              </button>
            </div>
            <div className="number-count w-[50%]">
              <p>{count}</p>
            </div>

            <div className="positive">
              <button className="text-3xl" onClick={incrementCount}>
                {/* this is the quantity */}+
              </button>
            </div>
          </div>
          {/* Add to cart button */}
          <div
            onClick={addToCart}
            className="Add-To-Cart-container w-[70%] bg-black text-white rounded-full gap-5 p-3 flex items-center justify-center  hover:bg-orange-500 duration-300 cursor-pointer"
          >
            <button className="cart-button text-3xl">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
