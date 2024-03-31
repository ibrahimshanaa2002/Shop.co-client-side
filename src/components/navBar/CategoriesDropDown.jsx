import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LiaMaleSolid } from "react-icons/lia";
import { LiaFemaleSolid } from "react-icons/lia";
import { TbMoodKid } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";

const CategoriesDropDown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white">
      <motion.div
        animate={open ? "open" : "closed"}
        className="relative transition-colors duration-300 dark:bg-[rgb(30,30,30)] dark:text-white "
      >
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3  rounded-md text-black  transition-colors"
        >
          <span className="dark:text-white">Categories</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown className="dark:text-white" />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option
            setOpen={setOpen}
            Icon={LiaMaleSolid}
            text="Men"
            to="/Men-Products"
          />
          <Option
            setOpen={setOpen}
            Icon={LiaFemaleSolid}
            text="Women"
            to="/Women-Products"
          />
          <Option
            setOpen={setOpen}
            Icon={TbMoodKid}
            text="Kids"
            to="/Kids-Product"
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen, to, targetId }) => {
  const handleClick = () => {
    setOpen(false);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="w-full">
      {to ? (
        <Link to={to} className="w-full" onClick={() => setOpen(false)}>
          <motion.li
            variants={itemVariants}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
          >
            <motion.span variants={actionIconVariants}>
              <Icon />
            </motion.span>
            <span>{text}</span>
          </motion.li>
        </Link>
      ) : (
        <motion.li
          variants={itemVariants}
          onClick={handleClick}
          className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
          <motion.span variants={actionIconVariants}>
            <Icon />
          </motion.span>
          <span>{text}</span>
        </motion.li>
      )}
    </div>
  );
};

export default CategoriesDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
