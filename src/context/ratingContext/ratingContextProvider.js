import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const RatingContext = createContext([]);

const RatingContextProvider = (props) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchAllRatings = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/feedback`
        );
        setRatings(response.data); // Set ratings state with data from the server
      } catch (error) {
        console.error("Error fetching all ratings:", error);
      }
    };

    fetchAllRatings(); // Call fetchAllRatings function on component mount
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <RatingContext.Provider value={ratings}>
      {props.children}
    </RatingContext.Provider>
  );
};

export default RatingContextProvider;
