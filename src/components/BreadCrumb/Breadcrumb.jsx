import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const routeNames = {
  "/": "Home",
  "/newArrivals": "New Arrivals",
  "/allProducts": "All Products",
  "/about": "About",
  "/topSelling": "Top Selling",
  "/gym-collection": "GYM Collection",
  "/formal-collection": "Formal Collection",
  "/party-collection": "Party Collection",
  "/casual-collection": "Casual Collection",
  "/women-products": "Women's products",
  "/men-products": "Men's products",
  "/kids-product": "Kid's products",
  "/cart": "Cart",
  "/checkOut": "Checkout",
  // No need to include "/product/:productId" here

  // Add more routes as needed
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <ul className="flex items-center gap-4 px-5">
        <li>
          <Link
            to="/"
            className="text-gray-700 text-opacity-50 dark:text-white dark:text-opacity-70"
          >
            Home
          </Link>
        </li>
        <li>
          <MdKeyboardDoubleArrowRight className="text-gray-700 text-opacity-50 dark:text-white" />
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName =
            routeNames[routeTo] || (isLast ? "Product Details" : name);
          return (
            <React.Fragment key={name}>
              <li>
                <Link
                  className="dark:text-orange-500 dark:text-opacity-60"
                  to={routeTo}
                >
                  {displayName}
                </Link>
              </li>
              {!isLast && (
                <li>
                  <MdKeyboardDoubleArrowRight className="text-gray-700 text-opacity-50 dark:text-white" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
