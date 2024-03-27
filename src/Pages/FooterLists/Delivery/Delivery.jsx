import React, { useState } from "react";
import DeliveryServicePNG from "../../../assets/Footer/Delivery Services.png";
import { ThreeDots } from "react-loader-spinner";

const Delivery = () => {
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [box4, setBox4] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to handle the image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      <div>
        <img
          src={DeliveryServicePNG}
          alt="blue pattern background"
          className={`w-full h-100 object-center object-fit z-0 ${
            imageLoaded ? "" : "hidden"
          }`}
          onLoad={handleImageLoad} // Call handleImageLoad when the image is loaded
        />
        <div className="flex justify-center items-center ">
          {/* Show the loading spinner if the image is not loaded */}
          {!imageLoaded && (
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#000000"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
      </div>

      <div class=" flex flex-col items-center  px-2 z-20 pt-2">
        <div class=" w-full">
          <div class="bg-white shadow rounded p-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold leading-none text-gray-800">
                  Why choose our delivery service?
                </h2>
              </div>
              <button
                onClick={() => setBox1(!box1)}
                class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
              >
                {box1 ? (
                  <svg
                    role="button"
                    aria-label="close dropdown"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 1L9 5"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    role="button"
                    aria-label="open dropdown"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            {box1 && (
              <ul class="">
                <li>
                  <p class="text-base leading-normal text-gray-600 mt-4 lg:w-100">
                    Our delivery service is designed to provide you with
                    convenience, reliability, and peace of mind. Whether you're
                    sending packages locally or internationally, our efficient
                    delivery network ensures that your items reach their
                    destination safely and on time. With options for express and
                    standard delivery, as well as tracking capabilities, you can
                    trust us to handle your shipments with care and
                    professionalism.
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div class="bg-white shadow rounded p-8 mt-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold leading-none text-gray-800">
                  What shipping methods are available?
                </h2>
              </div>
              <button
                onClick={() => {
                  setBox2(!box2);
                }}
                data-menu
                class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
              >
                {box2 ? (
                  <svg
                    role="button"
                    aria-label="close dropdown"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 1L9 5"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    role="button"
                    aria-label="open dropdown"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {box2 && (
              <ul>
                <li>
                  <p class="text-base leading-normal text-gray-600 mt-4 lg:w-100">
                    We offer a variety of shipping methods to suit your needs
                    and budget. From express shipping for urgent deliveries to
                    standard shipping for cost-effective options, you can choose
                    the option that best fits your requirements. Additionally,
                    we provide international shipping for sending parcels
                    overseas, with customs clearance assistance to streamline
                    the process and avoid delays.
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div class="bg-white shadow rounded p-8 mt-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold leading-none text-gray-800">
                  Is our delivery service reliable?
                </h2>
              </div>
              <button
                onClick={() => {
                  setBox3(!box3);
                }}
                data-menu
                class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
              >
                {box3 ? (
                  <svg
                    role="button"
                    aria-label="close dropdown"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 1L9 5"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    role="button"
                    aria-label="open dropdown"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {box3 && (
              <ul>
                <li>
                  <p class="text-base leading-normal text-gray-600 mt-4 lg:w-100">
                    Reliability is at the core of our delivery service. We
                    understand the importance of timely delivery and strive to
                    exceed your expectations with every shipment. Our dedicated
                    team of logistics professionals works tirelessly to ensure
                    that your packages are handled with care and delivered
                    promptly. With real-time tracking updates, you can stay
                    informed about the status of your shipment every step of the
                    way.
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div class="bg-white shadow rounded p-8 mt-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold leading-none text-gray-800">
                  How to track a shipment?
                </h2>
              </div>
              <button
                onClick={() => setBox4(!box4)}
                data-menu
                class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
              >
                {box4 ? (
                  <svg
                    role="button"
                    aria-label="close dropdown"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 1L9 5"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    role="button"
                    aria-label="open dropdown"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#4B5563"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {box4 && (
              <ul>
                <li>
                  <p class="text-base leading-normal text-gray-600 mt-4 lg:w-100">
                    Tracking your shipment is easy with our online tracking
                    system. Simply enter the tracking number provided at the
                    time of booking into our tracking portal, and you'll receive
                    up-to-date information on the whereabouts of your package.
                    From pickup to delivery, you can monitor the progress of
                    your shipment in real-time, giving you peace of mind and
                    assurance that your package is on its way.
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
