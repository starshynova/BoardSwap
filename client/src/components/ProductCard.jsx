import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, isInCart, toggleCartItem }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ boxShadow: 2, textAlign: "center" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.photo}
          alt={product.title}
          sx={{ objectFit: "contain", cursor: "pointer" }}
          onClick={() => navigate(`/items/${product._id}`)}
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.status}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ${product.price}
          </Typography>
          <Button
            variant="contained"
            color={isInCart ? "error" : "primary"}
            onClick={() => toggleCartItem(product)}
            sx={{ mt: 2 }}
            fullWidth
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isInCart: PropTypes.bool.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};

export default ProductCard;
