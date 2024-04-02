import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Cart.css";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlineDiscount } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { UserContext } from "../../context/userContext/userContextProvider";

import axios from "axios";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Cart = () => {
  // User context
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State variables
  const [productsInCart, setProductsInCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Constants
  const DISCOUNT_RATE = 0.2;
  const DELIVERY = 15;

  // Function to calculate total cost for a product
  const calculateTotalCost = useCallback((quantity, price) => {
    return quantity * price;
  }, []);

  // Function to calculate subtotal and total
  const calculateSubtotal = useCallback(
    (products) => {
      const newSubtotal = products.reduce(
        (total, product) =>
          total + calculateTotalCost(product.quantity, product.newprice),
        0
      );
      const newTotal = newSubtotal - newSubtotal * DISCOUNT_RATE + DELIVERY;

      setSubtotal(newSubtotal);
      setTotal(newTotal);
    },
    [calculateTotalCost]
  );

  // Fetch products in the cart on component mount
  useEffect(() => {
    const fetchProductsInCart = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userToken = userData ? userData.token : null;
        const response = await axios.get(`${backendUrl}/api/cart/cart`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setProductsInCart(response.data.productsInCart);

        // Calculate subtotal and total on products update
        calculateSubtotal(response.data.productsInCart);
      } catch (error) {
        console.error("Error fetching products in cart:", error);
      }
    };

    fetchProductsInCart();
  }, [calculateSubtotal]);

  // Function to handle deletion of a product from cart
  const handleDelete = async (productId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userToken = userData ? userData.token : null;

      await axios.delete(`${backendUrl}/api/cart/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setProductsInCart(
        productsInCart.filter((product) => product._id !== productId)
      );

      // Recalculate subtotal and total after deletion
      calculateSubtotal(
        productsInCart.filter((product) => product._id !== productId)
      );

      console.log("Product deleted successfully:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to navigate to checkout page with cart items data
  const handleCheckout = () => {
    navigate("/checkout", {
      state: { cartItems: productsInCart, subtotal: subtotal, total: total },
    });
  };

  return (
    <div className="transition-colors duration-300 dark:bg-[rgb(18,18,18)] dark:text-white">
      <div className="pt-2">
        <Breadcrumb />
      </div>
      {/* Cart title */}
      <div className="title px-5 py-5">
        <h1 className="text-5xl font-bold flex items-center">Your Cart</h1>
      </div>
      {/* Cart content */}
      <div className="full-container w-full flex px-5 py-5 gap-5">
        {/* Left side - Cart items */}
        <div className="left-sidess border-[1px] overflow-y-auto border-gray-300 rounded-2xl flex flex-row w-[70%]">
          <div className="w-full">
            {productsInCart.map((product) => (
              <div key={product._id} className="items-center p-5 ">
                <div className="flex items-center">
                  <div className=" h-[170px] w-[170px]">
                    {" "}
                    <div className="h-full">
                      <img
                        src={product.img}
                        alt=""
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    {" "}
                    <div className="flex items-center justify-between w-full pt-1">
                      <div className="product-title flex justify-between w-full">
                        <p className="font-extrabold leading-none">
                          {product.title}
                        </p>
                        <FaTrashCan
                          onClick={() => handleDelete(product._id)}
                          className="hover:text-red-600 duration-200 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-3 dark:text-orange-500 dark:opacity-60">
                      Size: {product.size}
                    </p>
                    <p className="text-xs leading-3 text-gray-600 py-2 pb-3 dark:text-orange-500 dark:opacity-60">
                      Color: {product.color}
                    </p>
                    <div className="flex flex-col justify-between">
                      <div className="price flex items-center py-1">
                        <h1 className="mr-2 text-base font-bold leading-none">
                          Price:
                        </h1>
                        <p className="leading-none text-gray-800 dark:text-white  dark:font-semibold">
                          ${product.newprice}
                        </p>
                      </div>
                      <div className="price flex items-center py-1">
                        <h1 className="mr-2 text-base font-bold leading-none">
                          Quantity:
                        </h1>
                        <p className="leading-none text-gray-800 dark:text-white dark:font-semibold">
                          {product.quantity}
                        </p>
                      </div>
                      <div className="price flex items-center py-1">
                        <h1 className="mr-2 text-base font-bold leading-none">
                          Total Cost:
                        </h1>
                        <p className="leading-none text-gray-800 dark:text-white  dark:font-semibold">
                          $
                          {calculateTotalCost(
                            product.quantity,
                            product.newprice
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right side - Order summary */}
        <div className="right-sidess border-[1px] border-gray-300 rounded-2xl w-1/2 p-5">
          <div>
            <h1 className="text-3xl font-semibold pb-5">Order Summary</h1>
            {/* Subtotal */}
            <div className="subtotal flex items-center justify-between py-2">
              <h1 className="text-xl text-gray-700 dark:text-white">
                Subtotal
              </h1>
              <h2 className="text-xl font-bold">${subtotal}</h2>
            </div>
            {/* Discount */}
            <div className="discount flex items-center justify-between py-2">
              <h1 className="text-xl text-gray-700 dark:text-white">
                Discount (-20%)
              </h1>
              <h2 className="text-xl text-red-500 font-bold">
                ${(subtotal * DISCOUNT_RATE).toFixed(2)}
              </h2>
            </div>
            {/* Delivery fee */}
            <div className="fees flex items-center justify-between py-2">
              <h1 className="text-xl text-gray-700 dark:text-white">
                Delivery Fee
              </h1>
              <h2 className="text-xl  font-bold">${DELIVERY}</h2>
            </div>
            <hr />
            {/* Total */}
            <div className="total flex items-center justify-between py-2">
              <h1 className="text-xl text-gray-700 dark:text-white">Total</h1>
              <h2 className="text-2xl  font-bold">${total}</h2>
            </div>
            {/* Promo code */}
            <div className="promo flex items-center gap-2 dark:text-black">
              <div className="relative w-[70%] py-5">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border rounded-3xl w-full bg-[#F0F0F0] focus:outline-none focus:border-transparent focus:ring-0"
                  placeholder="Enter your promo code"
                />
                <div
                  className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
                >
                  <MdOutlineDiscount />
                </div>
              </div>
              <div className="w-[30%] flex items-center justify-center bg-black text-white py-2 rounded-3xl cursor-pointer hover:bg-orange-500 duration-300 ">
                <span>Apply</span>
              </div>
            </div>
            {/* Checkout button */}
            <div
              className={`checkout flex justify-center items-center bg-black text-white py-2 rounded-3xl cursor-pointer hover:bg-orange-500 duration-300 ${
                productsInCart.length === 0 ? "hidden" : ""
              }`}
              onClick={handleCheckout} // Call handleCheckout function onClick
            >
              <span>Go To Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
