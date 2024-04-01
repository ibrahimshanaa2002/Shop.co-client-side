import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./ReviewsCard.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FeedBackSubmit = () => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false); // State to manage submission success message

  const handleReviewChange = (event) => {
    const text = event.target.value;
    if (text.length > 165) {
      setError("Text must not exceed 165 characters");
    } else {
      setReview(text);
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (review.length < 5) {
      setError("Text must be at least 10 characters");
    } else {
      setError("");
      try {
        const response = await axios.post(`${backendUrl}/api/user/feedback`, {
          name: name,
          title: title,
          body: review,
          rating: value,
        });
        console.log("Feedback submitted successfully:", response.data);
        setValue("");
        setHover("");
        setTitle("");
        setName("");
        setReview("");
        setSubmitted(true); // Set submitted state to true after successful submission
      } catch (error) {
        setError("Name or Title is already in use.");
        console.error("Error submitting feedback:", error);
      }
    }
  };

  const isButtonDisabled =
    review.length < 5 || review.length > 165 || error !== "";

  return (
    <div className="bg-white rounded-xl">
      {!submitted && (
        <>
          <h1 className="text-center text-2xl font-semibold text-gray-500">
            How would you rate your service with us?
          </h1>
          <div className="flex flex-wrap justify-center mt-10 space-x-3">
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </div>
          <form
            className="mt-8 mb-2 flex gap-2 justify-center flex-col "
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 twoinputs">
              <div className="flex justify-center border-2 py-2 px-6 rounded-xl w-full">
                <input
                  type="text"
                  placeholder="Write your name"
                  className="w-full outline-none text-gray-700 text-lg  focus:outline-none focus:border-transparent focus:ring-0 border-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-center border-2 py-2 px-6 rounded-xl w-full">
                <input
                  type="text"
                  placeholder="Write your title"
                  className="w-full outline-none text-gray-700 text-lg focus:outline-none focus:border-transparent focus:ring-0 border-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center border-2 py-2 px-6 rounded-xl h-44">
              <textarea
                placeholder="Write your review"
                className="w-full outline-none text-gray-700 text-lg resize-none focus:outline-none focus:border-transparent focus:ring-0 border-none"
                value={review}
                onChange={handleReviewChange}
              />
            </div>
            {error && !submitted && (
              <p className="text-red-500 text-center">{error}</p>
            )}
            <div className="button flex justify-center items-center py-3">
              <button
                type="submit"
                className={`bg-black hover:bg-orange-500 duration-300 text-green-50 font-semibold px-6 py-2 rounded-xl text-md ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Send
              </button>
            </div>
            <h1 className="flex justify-center items-center text-xl text-neutral-400 pointer-events-none">
              Review text must include at least 10 Characters
            </h1>
          </form>
        </>
      )}
      {submitted && (
        <div className="success-message flex flex-col justify-center items-center py-8">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Thank you for your feedback!
          </h2>
          <p className="text-gray-700">
            Your feedback has been successfully submitted.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedBackSubmit;
