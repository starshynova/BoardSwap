import { Box, Divider, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useUIContext } from "../../context/UIContext";
import { DrawerCard } from "./CartUI.styles";
import CartHeader from "./CartHeader";
import CartItemComponent from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = () => {
  const { cart, setCart, setShowCart, showCart } = useUIContext();

  const removeFromCart = useCallback(
    (id) => setCart((prevCart) => prevCart.filter((item) => item._id !== id)),
    [setCart],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);
  const handleCloseCart = useCallback(() => setShowCart(false), [setShowCart]);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0), 0),
    [cart],
  );

  return (
    <DrawerCard anchor="right" open={showCart} onClose={handleCloseCart}>
      <CartHeader handleCloseCart={handleCloseCart} />
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
            <Typography variant="body1" color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          cart.map((item) => (
            <CartItemComponent
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </Box>
      {cart.length > 0 && (
        <CartSummary totalPrice={totalPrice} clearCart={clearCart} />
      )}
    </DrawerCard>
  );
};

export default Cart;
