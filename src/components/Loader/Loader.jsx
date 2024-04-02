import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="lds-ellipsis dark:text-white dark:bg-white">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
