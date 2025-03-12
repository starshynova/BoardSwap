import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import CenteredTabs from "./Tabs";
import useFetch from "../hooks/useFetch";
import { useNavigate, useLocation } from "react-router-dom";

const ProductList = ({ cart, toggleCartItem }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [type, setType] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, performFetch } = useFetch(
    "/items",
    (jsonResult) => setFilteredProducts(jsonResult.result),
    null,
    null,
    type === "All" ? "" : type,
    null,
  );

  useEffect(() => {
    performFetch();
  }, [type]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromUrl = queryParams.get("type") || "All";
    setType(typeFromUrl);
  }, [location.search]);

  const handleTabChange = (event, newValue) => {
    let newType;
    if (newValue === 0) {
      newType = "All";
    } else if (newValue === 1) {
      newType = "Puzzle";
    } else if (newValue === 2) {
      newType = "Board Game";
    }
    setType(newType);
    navigate(`/items?type=${newType}`);
  };

  return (
    <div>
      <CenteredTabs onTabChange={handleTabChange} />

      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Grid container spacing={6}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isInCart={cart.some((item) => item._id === product._id)}
            toggleCartItem={toggleCartItem}
          />
        ))}
      </Grid>
    </div>
  );
};

ProductList.propTypes = {
  cart: PropTypes.array.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};

export default ProductList;
