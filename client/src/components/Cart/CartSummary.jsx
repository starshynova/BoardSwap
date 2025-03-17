import { Box, Typography, Button, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartSummary = ({ totalPrice, clearCart }) => (
  <>
    <Divider sx={{ my: 2 }} />
    <Box mt={1}>
      <Typography variant="body2" color="text.secondary">
        Subtotal: ${totalPrice.toFixed(2)}
      </Typography>
      <Typography variant="body2" color="green">
        <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} /> Free
      </Typography>
      <Typography variant="body2" fontWeight="bold" color="text.secondary">
        Total: ${totalPrice.toFixed(2)}
      </Typography>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Button
      onClick={clearCart}
      variant="outlined"
      color="error"
      fullWidth
      sx={{ mb: 2 }}
    >
      Clear Cart
    </Button>
    <Link to={`/order`}>
      <Button variant="contained" fullWidth>
        Order Now
      </Button>
    </Link>
  </>
);

CartSummary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default CartSummary;
