import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoClose } from "react-icons/io5";
import FeedBackSubmit from "./FeedBackSubmit";
import axios from "axios";
import "./ReviewsCard.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ReviewsCardHeader = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const fetchRatingCount = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/feedback/count`
        );
        setRatingCount(response.data.count); // Update rating count state with data from the server
      } catch (error) {
        console.error("Error fetching rating count:", error);
      }
    };
    fetchRatingCount(); // Call fetchRatingCount function on component mount
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleFilterByDate = async (dateRange) => {
    try {
      await axios.get(`${backendUrl}/api/user/feedback?dateRange=${dateRange}`);
      // Handle the filtered data, maybe update context or state with the filtered reviews
    } catch (error) {
      console.error("Error filtering reviews by date:", error);
    }
  };

  return (
    <div className="main-rl flex justify-between ">
      <div className="left-sides flex gap-2 items-center justify-center">
        <h1 className="text-2xl font-bold dark:text-white">All Reviews</h1>
        <h2 className="text-gray-400 text-lg font-semibold">({ratingCount})</h2>
      </div>
      <div className="right-sides flex gap-2 items-center justify-center">
        <span className="date-filter">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-3xl bg-white p-3 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Latest
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterByDate("today")} // Call a function to filter by today's date
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        Today
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterByDate("lastWeek")} // Call a function to filter by last week
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        Last Week
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterByDate("lastMonth")} // Call a function to filter by last month
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        Last Month
                      </button>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleFilterByDate("lastYear")} // Call a function to filter by last year
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Last Year
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </span>
        <span
          className="review-submit bg-black text-white rounded-3xl p-3 cursor-pointer hover:bg-orange-500 duration-300"
          onClick={() => setIsPopupOpen(true)} // Open the popup when clicked
        >
          <h1>Write a Review</h1>
        </span>
        {isPopupOpen && (
          <div className="popup fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-5">
            <div className="popup-content bg-white px-3  rounded-lg">
              <div className="close-button flex justify-end hover:text-orange-500 duration-300">
                <button className="mt-4" onClick={() => setIsPopupOpen(false)}>
                  <IoClose />
                </button>
              </div>
              <div className="p-8">
                <FeedBackSubmit />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsCardHeader;
