import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../theme";
import { CartItem, ProductImage } from "./CartUI.styles";
import PropTypes from "prop-types";

const CartItemComponent = ({ item, removeFromCart }) => (
  <CartItem key={item._id}>
    <Box display="flex" alignItems="center">
      {item.photo && (
        <ProductImage src={item.photo} alt={item.title || "Product"} />
      )}
      <Box>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: theme.palette.text.secondary }}
        >
          {item.title || "Unnamed Product"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {item.condition || "Unknown"}
        </Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ color: theme.palette.primary.main }}
        >
          €{item.price?.toFixed(2) || "N/A"}
        </Typography>
      </Box>
    </Box>
    <IconButton onClick={() => removeFromCart(item._id)} color="error">
      <DeleteIcon />
    </IconButton>
  </CartItem>
);

CartItemComponent.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    condition: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.string,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItemComponent;
