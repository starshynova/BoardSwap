import Drawer from "@mui/material/Drawer";
import {
  Box,
  styled,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import { useUIContext } from "../context/UIContext";
import theme from "./theme";
import { Link } from "react-router-dom";

const DrawerCard = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 450,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
}));

const CartItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginBottom: "10px",
}));

const ProductImage = styled("img")({
  width: 70,
  height: 70,
  borderRadius: 8,
  objectFit: "cover",
  marginRight: 15,
});

const Cart = () => {
  const { cart, setCart, setShowCart, showCart } = useUIContext();

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const finalTotal = totalPrice;

  return (
    <DrawerCard
      anchor="right"
      open={showCart}
      onClose={() => setShowCart(false)}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          <ShoppingCartIcon
            fontSize="large"
            sx={{ color: theme.palette.primary.main, mr: 1 }}
          />
        </Typography>
        <IconButton onClick={() => setShowCart(false)} color="primary">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "60vh",
          flexGrow: 1,
          paddingRight: "10px",
        }}
      >
        {cart.length === 0 ? (
          <Box textAlign="center" mt={3}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          cart.map((item) => (
            <CartItem key={item._id}>
              <Box display="flex" alignItems="center">
                {item.photo && (
                  <ProductImage
                    src={item.photo}
                    alt={item.title || "Product"}
                  />
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
                    ${item.price?.toFixed(2) || "N/A"}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => removeFromCart(item._id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </CartItem>
          ))
        )}
      </Box>

      {cart.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box mt={1}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Subtotal: ${totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="green">
              <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} /> Free
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: theme.palette.text.secondary }}
            >
              Total: ${finalTotal.toFixed(2)}
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
      )}
    </DrawerCard>
  );
};

export default Cart;
