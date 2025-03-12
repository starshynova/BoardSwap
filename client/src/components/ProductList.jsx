import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, cart, toggleCartItem }) => {
  return (
    <Grid container spacing={6}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isInCart={cart.some((item) => item._id === product._id)}
          toggleCartItem={toggleCartItem}
        />
      ))}
    </Grid>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};

export default ProductList;
