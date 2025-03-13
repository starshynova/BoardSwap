import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import CenteredTabs from "./Tabs";
import { useNavigate } from "react-router-dom";

const ProductList = ({
  products,
  cart,
  toggleCartItem,
  setType,
  selectedType,
}) => {
  const navigate = useNavigate();

  const handleTabChange = (event, newType) => {
    setType(newType);
    navigate(`/?type=${newType}`);
  };

  return (
    <div>
      <CenteredTabs onTabChange={handleTabChange} selectedType={selectedType} />

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
