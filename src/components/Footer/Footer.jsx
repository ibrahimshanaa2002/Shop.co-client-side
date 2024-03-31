import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  Mastercard,
  Visa,
  Paypal,
  Unionpay,
  Hiper,
} from "react-payment-logos/dist/flat";
const Footer = () => {
  return (
    <div>
      <div className="bg-[#F0F0F0] transition-colors duration-300 dark:bg-[rgb(30,30,30)] dark:text-white h-full flex flex-col items-center justify-center relative w-full px-16">
        <div className="flex flex-col items-center justify-between w-full py-24">
          {/* shopco */}
          <div className="flex-col bg items-center justify-center gap-4 w-full mr-8 py-10">
            <h1 className="font-extrabold text-xl py-2 dark:text-orange-500">
              SHOP.CO
            </h1>
            <p className="py-2">
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex items-center justify-start gap-4 w-full dark:text-orange-500">
              <FaTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FaGithub />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            {/* company */}
            <div className="flex-col items-center justify-center gap-4 w-full sm:w-auto">
              <h1 className="font-semibold dark:text-orange-500">Company</h1>
              <ul className="mt-2 gap-2 flex-col items-start justify-center ">
                <li className="hover:text-orange-500">
                  <Link to={"/AboutUs"}>About Us</Link>
                </li>
                <li className="hover:text-orange-500">
                  <Link to={"/Features"}>Features</Link>
                </li>
                <li className="hover:text-orange-500">Works</li>
                <li className="hover:text-orange-500">Career</li>
              </ul>
            </div>
            {/* Help */}
            <div className="flex-col items-center justify-center gap-4 w-full py-10 sm:py-0 sm:w-auto">
              <h1 className="font-semibold dark:text-orange-500">Help</h1>
              <ul className="mt-2 gap-2 flex-col items-start justify-center">
                <Link to={"/ContactUs"} className="hover:text-orange-500">
                  Customer Support
                </Link>

                <Link to={"/Delivery-Details"}>
                  <li className="hover:text-orange-500">Delivery Details</li>
                </Link>
                <Link to={"/termsconditions"}>
                  <li className="hover:text-orange-500">Terms & Conditions</li>
                </Link>
                <li className="hover:text-orange-500">Privacy Policy</li>
              </ul>
            </div>
            {/* FAQ */}
            <div className="flex-col items-center justify-center gap-4 w-full sm:w-auto mb-7">
              <h1 className="font-semibold dark:text-orange-500">FAQ</h1>
              <ul className="mt-2 gap-2 flex-col items-start justify-center">
                <li className="hover:text-orange-500">Account</li>
                <li className="hover:text-orange-500">Manage Deliveries</li>
                <li className="hover:text-orange-500">Orders</li>
                <li className="hover:text-orange-500">Payments</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="flex-col items-center justify-center gap-4 w-full sm:w-auto">
              <h1 className="font-semibold dark:text-orange-500">Resources</h1>
              <ul className="mt-2 gap-2 flex-col items-start justify-center">
                <li className="hover:text-orange-500">Free eBook</li>
                <li className="hover:text-orange-500">Development Tutorials</li>
                <li className="hover:text-orange-500">How To Blog</li>
                <li className="hover:text-orange-500">YouTube Playlist</li>
              </ul>
            </div>
          </div>
          <div className="w-full h-[1px] bg-orange-600 my-4"></div>
          <div className="flex  flex-row items-center justify-between w-full py-4">
            <div className="w-full">
              Shop.co © 2000-2023, All Rights Reserved
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-normal  sm:gap-10 w-full ">
            <div className="hover:cursor-pointer">
              <Visa />
            </div>
            <div className="hover:cursor-pointer">
              <Mastercard />
            </div>
            <div className="hover:cursor-pointer">
              <Paypal />
            </div>
            <div className="hover:cursor-pointer">
              <Unionpay />
            </div>
            <div className="hover:cursor-pointer">
              <Hiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
