import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import CenteredTabs from "./Tabs";
import useFetch from "../hooks/useFetch";

const ProductList = ({ cart, toggleCartItem }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [type, setType] = useState("All");

  const { isLoading, error, performFetch } = useFetch(
    "/items",
    (jsonResult) => setFilteredProducts(jsonResult.result),
    null,
    null,
    type === "All" ? "" : type,
    null,
  );

  useEffect(() => {
    // Trigger fetch when the type changes
    performFetch();
  }, [type]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      setType("All");
    } else if (newValue === 1) {
      setType("Puzzle");
    } else if (newValue === 2) {
      setType("Board Game");
    }
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
