import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
// Create a context for Product data
export const ProductContext = createContext({});

// Provider component for ProductContext
const ProductContextProvider = (props) => {
  // State for products and new arrivals
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [TopSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Loading function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedProducts = sessionStorage.getItem("products");
        const cachedNewArrivals = sessionStorage.getItem("newArrivals");
        const cachedTopSelling = sessionStorage.getItem("topSelling");

        if (cachedProducts && cachedNewArrivals && cachedTopSelling) {
          setProducts(JSON.parse(cachedProducts));
          setNewArrivals(JSON.parse(cachedNewArrivals));
          setTopSellingProducts(JSON.parse(cachedTopSelling));
          setLoading(false);
        } else {
          const [productsResponse, newArrivalsResponse, topSellingResponse] =
            await Promise.all([
              axios.get(`${backendUrl}/api/product/allProducts`),
              axios.get(`${backendUrl}/api/product/newArrivals`),
              axios.get(`${backendUrl}/api/product/topSelling`),
            ]);

          setProducts(productsResponse.data);
          setNewArrivals(newArrivalsResponse.data);
          setTopSellingProducts(topSellingResponse.data);
          setLoading(false);

          sessionStorage.setItem(
            "products",
            JSON.stringify(productsResponse.data)
          );
          sessionStorage.setItem(
            "newArrivals",
            JSON.stringify(newArrivalsResponse.data)
          );
          sessionStorage.setItem(
            "topSelling",
            JSON.stringify(topSellingResponse.data)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // for sex
  const filterProductsForWomen = () => {
    return products.filter((product) => product.sex === "Women");
  };
  const filterProductsForMen = () => {
    return products.filter((product) => product.sex === "Men");
  };
  const filterProductsForKids = () => {
    return products.filter((product) => product.sex === "Kids");
  };
  // for seasen
  const filterProductsForfall = () => {
    return products.filter((product) => product.season === "fall");
  };
  const filterProductspring = () => {
    return products.filter((product) => product.season === "spring");
  };
  const filterProductsForsummer = () => {
    return products.filter((product) => product.season === "summer");
  };
  const filterProductsForwinter = () => {
    return products.filter((product) => product.season === "winter");
  };
  // for styling
  const filterProductsForCasual = () => {
    return products.filter((product) => product.style === "Casual");
  };
  const filterProductsForFormal = () => {
    return products.filter((product) => product.style === "Formal");
  };
  const filterProductsForParty = () => {
    return products.filter((product) => product.style === "Party");
  };

  const filterProductsForGym = () => {
    return products.filter((product) => product.style === "Gym");
  };

  // Function to filter products by color
  const filterProductsByColor = (color) => {
    return products.filter((product) => {
      // Ensure that the color property is always a string before calling toLowerCase
      const productColor =
        typeof product.color === "string" ? product.color : "";
      return productColor.toLowerCase() === color.toLowerCase();
    });
  };

  // Effect hook to fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/newArrivals`
        );
        setNewArrivals(response.data);
        // Assuming the response data is an array of products
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  // Effect hook to fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/allProducts`
        );
        setProducts(response.data);
        // Assuming the response data is an array of products
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);
  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/topSelling`
        );
        setTopSellingProducts(response.data);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    };

    fetchTopSellingProducts();
  }, []);

  const contextValue = {
    products: products,
    newArrivals: newArrivals,
    TopSellingProducts: TopSellingProducts,
    loading,
    filterProductsByColor: filterProductsByColor,
    filterProductsForWomen: filterProductsForWomen,
    filterProductsForMen: filterProductsForMen,
    filterProductsForKids: filterProductsForKids,
    filterProductsForfall: filterProductsForfall,
    filterProductspring: filterProductspring,
    filterProductsForsummer: filterProductsForsummer,
    filterProductsForwinter: filterProductsForwinter,
    filterProductsForCasual: filterProductsForCasual,
    filterProductsForFormal: filterProductsForFormal,
    filterProductsForParty: filterProductsForParty,
    filterProductsForGym: filterProductsForGym,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
