import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import { useUIContext } from "../../context/UIContext";
import theme from "../theme";
import { Link } from "react-router-dom";
import { CartItem, DrawerCard, ProductImage } from "./CartUI.styles";
import { useCallback, useMemo } from "react";

const Cart = () => {
  const { cart, setCart, setShowCart, showCart } = useUIContext();

  const removeFromCart = useCallback(
    (id) => {
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    },
    [setCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const handleCloseCart = useCallback(() => {
    setShowCart(false);
  }, [setShowCart]);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0), 0),
    [cart],
  );
  const finalTotal = totalPrice;

  return (
    <DrawerCard anchor="right" open={showCart} onClose={handleCloseCart}>
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
        <IconButton onClick={handleCloseCart} color="primary">
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
