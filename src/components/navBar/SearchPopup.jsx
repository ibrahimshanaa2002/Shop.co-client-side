import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext/productContextProvider"; // Adjust the path to the context file
import { IoSearchOutline } from "react-icons/io5";

const SearchPopup = () => {
  const { products } = useContext(ProductContext); // Accessing products from context
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Function to handle search query change
  const handleSearchChange = (event) => {
    const query = event.target.value; // Trim spaces from both ends of the query
    setSearchQuery(query);
    setIsOpen(true); // Open the popup when the user types in the search input
  };

  useEffect(() => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/); // Split the search query into individual words

    const filteredProducts = products.filter((product) => {
      // Search in multiple fields (title, description, category)
      const fieldsToSearch = [
        (product.title || "").toLowerCase(),
        (product.desc || "").toLowerCase(),
        (product.sex || "").toLowerCase(),
        (product.season || "").toLowerCase(),
        (product.style || "").toLowerCase(),
        (product.color || ""),
      ];

      return queryWords.every((word) => {
        // Check if any of the fields contain all of the query words
        return fieldsToSearch.some((field) => field.includes(word));
      });
    });

    // Sort the results based on relevance (exact matches first)
    const sortedResults = filteredProducts.sort((a, b) => {
      const aTitle = (a.title || "").toLowerCase();
      const bTitle = (b.title || "").toLowerCase();
      const query = searchQuery.toLowerCase();

      const aIndex = aTitle.indexOf(query);
      const bIndex = bTitle.indexOf(query);

      // If one title contains the query and the other doesn't, prioritize the match
      if (aIndex >= 0 && bIndex < 0) return -1;
      if (bIndex >= 0 && aIndex < 0) return 1;

      // Otherwise, sort alphabetically
      return aTitle.localeCompare(bTitle);
    });

    setSearchResults(sortedResults);
  }, [searchQuery, products]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false); // Close the popup when the user clicks outside of it
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={searchRef}>
      {/* Search input */}
      <div className="bg-gray-100 flex justify-center items-center sm:flex w-full px-2 py-1 ml-5 placeholder:text-[10px] rounded-full ">
        <IoSearchOutline size={30} className="text-gray-500 " />
        <input
          className="bg-transparent border-none rounded-none w-full outline-none px-4 focus:outline-none focus:border-transparent focus:ring-0"
          type="text"
          placeholder="Search For Products..."
          name=""
          id=""
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {/* Display search results */}
      {isOpen && (
        <div className="absolute bg-white top-full z-10 left-0 right-0 shadow-lg border-t-2">
          {searchResults.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="flex items-center border-b border-gray-200 py-4  hover:bg-opacity-60 bg-white bg-opacity-50 transition duration-300 ease-in-out hover:bg-gray-100 px-5 "
            >
              {/* Product image */}
              <img
                src={product.img}
                alt={product.title}
                className="w-24 h-24 object-cover mr-4"
              />
              {/* Product details */}
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  {product.title}
                </h3>
                <p className="text-sm text-neutral-500">{product.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPopup;
