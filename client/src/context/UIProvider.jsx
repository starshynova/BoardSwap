import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UIContext } from "./UIContext";

const UIProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <UIContext.Provider value={{ cart, setCart, showCart, setShowCart }}>
      {children}
    </UIContext.Provider>
  );
};

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIProvider;
