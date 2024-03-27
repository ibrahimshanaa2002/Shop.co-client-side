import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./StaticCard.css";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const StatisticCard = ({ count, description }) => {
  const [formattedCount, setFormattedCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      setFormattedCount(`+${count}`);
    } else {
      setFormattedCount(count);
    }
  }, [count]);

  return (
    <div className="w-full p-3 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 text-black rounded-t rounded-b-none overflow-hidden">
        <div className="p-8 text-3xl font-bold text-center border-b-4 duration-300 transition-transform hover:transform hover:-translate-y-3 hover:text-orange-500 cursor-pointer">
          <CountUp
            end={count}
            duration={2}
            separator=","
            prefix={formattedCount >= 0 ? "+" : ""}
          />
        </div>
        <ul className="w-full text-center text-sm">
          <li className="py-4 text-lg">{description}</li>
        </ul>
      </div>
    </div>
  );
};

const StaticsCard = (props) => {
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

  return (
    <div className="flex flex-col justify-center text-center items-center ">
      <div className="flex justify-center w-full">
        <StatisticCard count={200} description="International Brands" />
        <StatisticCard
          count={props.nbProducts}
          description="High-Quality Products"
        />
      </div>
      <div className="one flex justify-center w-full">
        <StatisticCard count={ratingCount} description="Happy Customers" />
      </div>
    </div>
  );
};

export default StaticsCard;
