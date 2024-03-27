import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className=" h-screen  p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        <div className="bg-black bg-opacity-95 md:col-span-4 p-10 text-white">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-orange-500">Touch</span>
          </h3>
          <p className="mt-4 leading-7 text-gray-200 mb-8">
            Welcome to our support center, where our dedicated team is committed
            to providing you with the assistance you need. Whether you have
            questions about our products or services, encounter technical
            difficulties, or simply need guidance, we're here to help.
          </p>

          <p className="mt-4 leading-7 text-gray-200 mb-8">
            Our goal is to ensure that your experience with us is as smooth and
            seamless as possible. No matter the issue, our knowledgeable support
            staff is just a message away, ready to promptly assist you in
            finding the right solution.
          </p>

          <p className="mt-4 leading-7 text-gray-200 mb-8">
            We understand that your time is valuable, so we strive to resolve
            your inquiries efficiently and effectively. Our team is equipped
            with the expertise and resources necessary to address any concerns
            you may have.
          </p>

          <p className="mt-4 leading-7 text-gray-200 mb-8">
            Feel free to reach out to us at any time, and rest assured that we
            are here to support you every step of the way. Your satisfaction is
            our priority, and we are committed to delivering the highest level
            of service possible.
          </p>

          <p className="mt-4 leading-7 text-gray-200 mb-8">
            Thank you for choosing us as your trusted partner. We look forward
            to assisting you and ensuring that your experience with us exceeds
            your expectations.
          </p>

          <div className="flex mt-5 flex-col">
            <div className="flex items-center">
              <FaLocationDot className="text-white" />

              <span className="text-sm px-2 py-2">
                House #14, Street #12, Saida, Lebanon.
              </span>
            </div>
            <div className="flex items-center">
              <MdEmail className="text-white" />

              <span className="text-sm px-2 py-2">
                Email: shopcompass.sc@gmail.com
              </span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-white" />

              <span className="text-sm px-2 py-2">Phone: +961 76 760016</span>
            </div>
          </div>
        </div>
        <form className="md:col-span-8 p-10 flex flex-col justify-center">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="grid-first-name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                First Name
              </label>
              <input
                id="grid-first-name"
                name="first_name"
                type="text"
                placeholder="Jane"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="grid-last-name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Last Name
              </label>
              <input
                id="grid-last-name"
                name="last_name"
                type="text"
                placeholder="Doe"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="grid-email"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Email Address
              </label>
              <input
                id="grid-email"
                name="email"
                type="email"
                placeholder="********@*****.**"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="grid-message"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="grid-message"
                name="message"
                rows="10"
                placeholder="Your message here..."
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full px-3">
            <div className="md:flex md:items-center py-2">
              <label className="block text-gray-500 font-bold">
                <input type="checkbox" className="mr-2 leading-tight" />
                <span className="text-sm">Send me your newsletter!</span>
              </label>
            </div>
            <button
              type="submit"
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
