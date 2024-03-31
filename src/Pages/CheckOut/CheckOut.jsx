import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LB from "../../assets/Flags/LB.png";
import { MdAlternateEmail, MdOutlinePhoneIphone } from "react-icons/md";
import axios from "axios";
import { UserContext } from "../../context/userContext/userContextProvider";
import { useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const CheckOut = () => {
  const governorates = [
    "Beirut",
    "Mount Lebanon",
    "North Lebanon",
    "South Lebanon",
    "Beqaa",
    "Nabatieh",
    "Saida",
  ];
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(user.email.toLowerCase());
  const [name, setName] = useState(user.username.toLowerCase());
  const { cartItems, subtotal, total } = location.state;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [zip, setZip] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedGovernorate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const totalQuantity = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
      );

      const orderData = {
        user: user._id,
        email: email,
        name: name,
        products: cartItems.map((product) => product._id),
        subtotal: subtotal,
        total: total,
        phoneNumber: phoneNumber,
        streetAddress: street,
        state: selectedGovernorate,
        zip: zip,
        size: cartItems.map((product) => product.size),
        color: cartItems.map((product) => product.color),
        quantity: totalQuantity,
      };

      const response = await axios.post(
        `${backendUrl}/api/create-order`,
        orderData
      );

      const userData = JSON.parse(localStorage.getItem("user"));
      const userToken = userData ? userData.token : null;
      await axios.delete(`${backendUrl}/api/cart/deleteAllFromTheCart`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setOrderSuccess(true);
      setPhoneNumber("");
      setZip("");
      setSelectedGovernorate("");
      setStreet("");

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center transition-colors duration-300 dark:bg-[rgb(18,18,18)]">
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 w-[70%] lg:w-[50%] transition-colors duration-300 dark:bg-[rgb(30,30,30)]">
        <p className="text-xl font-medium dark:text-orange-500">
          Payment Details
        </p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <div className="">
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium dark:text-white"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
              placeholder="Your email here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <MdAlternateEmail />
            </div>
          </div>
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium dark:text-white"
          >
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
              placeholder="Your full name here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <MdAlternateEmail />
            </div>
          </div>
          <label
            htmlFor="card-no"
            className="mt-4 mb-2 block text-sm font-medium dark:text-white"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
              placeholder="+961 xx xxxxxx"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <MdOutlinePhoneIphone />
            </div>
          </div>

          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium dark:text-white"
          >
            Billing Address
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input
                type="text"
                id="billing-address"
                onChange={(e) => setStreet(e.target.value)}
                name="billing-address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
                placeholder="Street Address"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  src={LB}
                  alt="lebanon-flag"
                  className="w-[24px
                  ] h-[16px]"
                />
              </div>
            </div>
            <select
              type="text"
              name="billing-governorate"
              value={selectedGovernorate}
              onChange={handleSelectChange}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
            >
              <option value="">Select</option>
              {governorates.map((governorate, index) => (
                <option key={index} value={governorate}>
                  {governorate}
                </option>
              ))}
            </select>
            <input
              type="text"
              inputMode="numeric"
              name="billing-zip"
              onChange={(e) => setZip(e.target.value)}
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:outline-none focus:border-transparent focus:ring-0"
              placeholder="ZIP"
            />
          </div>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Subtotal
              </p>
              <p className="font-semibold text-gray-900 dark:text-orange-500">
                ${subtotal}
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Quantity
              </p>
              <p className="font-semibold text-gray-900 dark:text-orange-500">
                {cartItems.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-medium text-gray-900 text-2xl dark:text-white">
              Total
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-orange-500">
              ${total}
            </p>
          </div>
        </div>
        <button
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-orange-500 dark:hover:text-white px-6 py-3 font-medium text-white hover:bg-orange-500 duration-300"
          onClick={handleSubmit}
        >
          Place Order
        </button>
      </div>
      {orderSuccess && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col  justify-center items-center w-full h-full">
            <FiCheckCircle className="text-8xl text-green-700 mb-4" />

            <p className="text-2xl font-semibold text-black mb-4">
              Order Placed Successfully!
            </p>
            <p className=" text-black mb-4 text-center text-opacity-50">
              Thank you for your trust in us! We're committed to ensuring your
              order reaches you swiftly. We hope to deliver it to you in the
              fastest time possible, ensuring your satisfaction every step of
              the way. Thank you again for choosing us!
            </p>

            <Link
              to="/"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-orange-500 duration-300"
            >
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
