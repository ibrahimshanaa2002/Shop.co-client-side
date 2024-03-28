import React, { useEffect, useState } from "react";
import star1 from "../../assets/star_icon.png";
import star2 from "../../assets/star_dull_icon.png";
import { MdModeEdit } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Card.css";
import Aos from "aos";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ProductCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDesc, setEditedDesc] = useState(props.desc);
  const [editedNewPrice, setEditedNewPrice] = useState(props.newprice);
  const [editedOldPrice, setEditedOldPrice] = useState(props.oldprice);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/product/${props._id}`,
        {
          title: editedTitle,
          desc: editedDesc,
          newprice: editedNewPrice,
          oldprice: editedOldPrice,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update product.");
      }

      const updatedProductData = response.data;
      setEditedTitle(updatedProductData.title);
      setEditedDesc(updatedProductData.desc);
      setEditedNewPrice(updatedProductData.newprice);
      setEditedOldPrice(updatedProductData.oldprice);

      setIsEditing(false);
      setIsSaving(false);
      console.log("Changes saved successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${backendUrl}/api/product/product/${props._id}`);
        console.log("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <div
      className={`w-full sm:w-auto border-[1px] rounded-lg border-opacity-30 border-black  ${
        isAdminRoute ? "admin-product-card" : ""
      }`}
    >
      {isAdminRoute ? (
        <div className="w-full h-full border border-gray-200 justify-between rounded-lg overflow-hidden flex flex-col">
          <div className={`w-full relative img-hover-zoom`}>
            <img
              src={props.img}
              className="w-full h-auto"
              alt="Product"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="p-4 flex flex-col items-start flex-grow">
            <div className="text-sm sm:text-base md:text-lg flex w-full justify-between items-center gap-4">
              {isEditing ? (
                <input
                  className="w-full border-2 border-gray-200"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span>{props.title}</span>
              )}
              <span className="cursor-pointer" onClick={handleEdit}>
                <MdModeEdit />
              </span>
            </div>
            <div className="text-sm sm:text-base md:text-lg flex w-full items-center gap-5">
              {isEditing ? (
                <input
                  className="w-full border-2 border-gray-200"
                  type="text"
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                />
              ) : (
                <span>{props.desc}</span>
              )}
            </div>
            <div className="flex items-center mb-2">{/* Star ratings */}</div>
            <div className="flex items-center text-gray-400 gap-6">
              {isEditing ? (
                <>
                  <input
                    className="w-24 border-2 border-gray-200"
                    type="number"
                    value={editedNewPrice}
                    onChange={(e) => setEditedNewPrice(e.target.value)}
                  />
                  <input
                    className="w-24 border-2 border-gray-200"
                    type="number"
                    value={editedOldPrice}
                    onChange={(e) => setEditedOldPrice(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <div className="font-bold text-xs sm:text-base md:text-lg">
                    ${props.newprice}
                  </div>
                  <div className="font-bold text-xs sm:text-base md:text-lg line-through">
                    ${props.oldprice}
                  </div>
                </>
              )}
            </div>
            {isEditing && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSave}
              >
                Save
              </button>
            )}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Link
          to={`/product/${props._id}`}
          className="flex flex-col items-start  w-full h-full border border-gray-200 rounded-lg overflow-hidden"
          data-aos="zoom-in-down"
        >
          <div className={`w-full relative img-hover-zoom h-[30vh] `}>
            <img
              src={props.img}
              className="w-full h-auto"
              alt="Product"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="pl-4 pr-4 pb-4 flex flex-col justify-start ">
            <div className="text-sm sm:text-base md:text-lg font-bold titles leading-3 line-clamp-2 h-6 mb-1">
              {props.title}
            </div>
            <div className="text-sm sm:text-base md:text-[1.125rem] overflow-hidden  descriptions h-[3rem] line-clamp-2 text-gray-600 text-opacity-70">
              {props.desc}
            </div>
            <div className="flex items-center mb-2 py-4 justify-start">
              <img src={star1} className="w-4 h-4 mr-1" alt="Star" />
              <img src={star1} className="w-4 h-4 mr-1" alt="Star" />
              <img src={star1} className="w-4 h-4 mr-1" alt="Star" />
              <img src={star1} className="w-4 h-4 mr-1" alt="Star" />
              <img src={star2} className="w-4 h-4 mr-1" alt="Star" />
              <span className="text-xs ml-1">4/5</span>
            </div>
            <div className="flex items-center text-gray-400 gap-6">
              <div className="font-bold text-xs sm:text-base md:text-lg text-black">
                ${props.newprice}
              </div>
              <div className="font-bold text-xs sm:text-base md:text-lg line-through ">
                ${props.oldprice}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
