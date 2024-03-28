import React, { useContext, useState, useRef, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar } from "flowbite-react";
import { MdOutlineStyle } from "react-icons/md";

import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { TiHomeOutline } from "react-icons/ti";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbProgressAlert } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { LuDatabase } from "react-icons/lu";

import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import ShopDropDown from "./ShopDropDown";
import "./Navbar.css";
import CategoriesDropDown from "./CategoriesDropDown";
import SearchPopup from "./SearchPopup";
import { CartContext } from "../../context/CartContext/cartContextProvider";
import { Dropdown } from "flowbite-react";
import { IoIosTrendingUp } from "react-icons/io";
import Aos from "aos";
import { UserContext } from "../../context/userContext/userContextProvider";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const { itemCount } = useContext(CartContext);
  const navbarRef = useRef(null);
  const { user, logoutUser } = useContext(UserContext);

  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileNav(false);
      }
    };

    if (mobileNav) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileNav]);

  const isAdmin = () => {
    // Check if user is an admin
    return user && user.isAdmin;
  };
  return (
    <div className="relative" ref={navbarRef}>
      <div className="flex flex-row items-center px-3 py-4 justify-between md:gap-6 lg:px-8 md:px-8">
        <div className="flex items-center gap-5">
          <RxHamburgerMenu
            onClick={handleMobileNav}
            size={20}
            className="md:hidden"
          />
          <Link to={"/"} data-aos="fade-right">
            <h1 className="lg:text-3xl md:text-2xl text-lg font-extrabold">
              SHOP.CO
            </h1>
          </Link>
        </div>
        <ul
          className={`md:flex hidden items-center justify-center gap-6 w-full ${
            mobileNav ? "" : "hidden"
          }`}
        >
          {isAdmin() && <Link to={"/admin"}>Dashboard</Link>}
          <li>
            <ShopDropDown />
          </li>
          <li>On Sale</li>
          <Link to={"/newArrivals"}>New Arrivals</Link>
          <li>
            <CategoriesDropDown />
          </li>
        </ul>
        <SearchPopup />
        <div className="flex gap-4  items-center justify-center  pl-8 ">
          <Link to={"/Cart"}>
            <div className="relative ">
              <FiShoppingCart
                size={22}
                className="hover:text-red-900 duration-200 cursor-pointer"
              />
              <div className="rounded-full bg-red-600 flex items-center justify-center absolute top-[-35%] left-[-40%] text-white w-full h-full text-sm">
                {itemCount > 0 ? itemCount : 0}
              </div>
            </div>
          </Link>
          <div>
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <span>
                  {" "}
                  <FaRegUserCircle
                    size={22}
                    className="hover:text-red-900 duration-200 cursor-pointer"
                  />
                </span>
              )}
            >
              {user ? (
                <div>
                  <Dropdown.Item onClick={logoutUser}>Sign Out</Dropdown.Item>
                </div>
              ) : (
                <div>
                  <Link to={"/authentication"}>
                    <Dropdown.Item>Sign Up</Dropdown.Item>
                  </Link>
                </div>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
      {mobileNav && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 w-fit"></div>
      )}
      <div
        className={`md:hidden inset-y-0 left-0 w-2/3 z-50 transition-transform transform absolute h-screen top-16 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="w-[full]"
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to={"/"}>
                <Sidebar.Item icon={TiHomeOutline}>Home</Sidebar.Item>
              </Link>
              {isAdmin() && (
                <Link to={"/admin"}>
                  <Sidebar.Item icon={LuDatabase}>Dashboard</Sidebar.Item>
                </Link>
              )}
              <Sidebar.Collapse
                icon={HiOutlineShoppingBag}
                label="Shop"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

                  return (
                    <IconComponent
                      aria-hidden
                      className={twMerge(
                        theme.label.icon.open[open ? "on" : "off"]
                      )}
                    />
                  );
                }}
              >
                <Link to={"/allProducts"}>
                  <Sidebar.Item>All Products</Sidebar.Item>
                </Link>
                <Link to={"/newArrivals"}>
                  <Sidebar.Item>New Arrivals</Sidebar.Item>
                </Link>

                <Sidebar.Collapse
                  icon={MdOutlineStyle}
                  label="Browse By Dress Style"
                  renderChevronIcon={(theme, open) => {
                    const IconComponent = open
                      ? HiOutlineMinusSm
                      : HiOutlinePlusSm;

                    return (
                      <IconComponent
                        aria-hidden
                        className={twMerge(
                          theme.label.icon.open[open ? "on" : "off"]
                        )}
                      />
                    );
                  }}
                >
                  <Link to={"/casual-collection"}>
                    {" "}
                    <Sidebar.Item>Casual</Sidebar.Item>
                  </Link>
                  <Link to={"/formal-collection"}>
                    <Sidebar.Item>Formal</Sidebar.Item>
                  </Link>
                  <Link to={"/party-collection"}>
                    {" "}
                    <Sidebar.Item>Party</Sidebar.Item>
                  </Link>
                  <Link to={"/gym-collection"}>
                    <Sidebar.Item>Gym</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </Sidebar.Collapse>
              <Sidebar.Item href="#" icon={TbProgressAlert}>
                On Sale
              </Sidebar.Item>

              <Sidebar.Item href="#" icon={IoIosTrendingUp}>
                Top Selling
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={BiCategory}
                label="Categories"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

                  return (
                    <IconComponent
                      aria-hidden
                      className={twMerge(
                        theme.label.icon.open[open ? "on" : "off"]
                      )}
                    />
                  );
                }}
              >
                <Link to={"/Men-Products"}>
                  {" "}
                  <Sidebar.Item>Men's</Sidebar.Item>
                </Link>
                <Link to={"/Women-Products"}>
                  <Sidebar.Item>Women's</Sidebar.Item>
                </Link>
                <Link to={"/Kids-Product"}>
                  {" "}
                  <Sidebar.Item>Kid's</Sidebar.Item>
                </Link>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
};

export default Navbar;
