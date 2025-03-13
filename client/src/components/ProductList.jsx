import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, cart, toggleCartItem }) => {
  return (
    <div>
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
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
};

export default ProductList;
