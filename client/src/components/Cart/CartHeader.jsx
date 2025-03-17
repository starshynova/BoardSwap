import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export const CartHeader = ({ handleCloseCart }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h5" fontWeight="bold">
      <ShoppingCartIcon
        fontSize="large"
        sx={{ color: theme.palette.primary.main, mr: 1 }}
      />
    </Typography>
    <IconButton onClick={handleCloseCart} color="primary">
      <CloseIcon />
    </IconButton>
  </Box>
);

CartHeader.propTypes = {
  handleCloseCart: PropTypes.func.isRequired,
};

export default CartHeader;
