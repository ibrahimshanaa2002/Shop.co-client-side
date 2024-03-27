import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductContextProvider from "./context/productContext/productContextProvider";
import RatingContextProvider from "./context/ratingContext/ratingContextProvider";
import { UserProvider } from "./context/userContext/userContextProvider";
import CartContextProvider from "./context/CartContext/cartContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <RatingContextProvider>
        <CartContextProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CartContextProvider>
      </RatingContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);

reportWebVitals();
