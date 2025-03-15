import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useUIContext } from "../context/UIContext";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();
  console.log(cart);
  return (
    <>
      <h1>Order</h1>
      <div>
        <p>Items in cart: {cart.length}</p>
        <Grid container spacing={6}>
          {cart.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isInCart={cart.some((item) => item._id === product._id)}
              toggleCartItem={toggleCartItem}
            />
          ))}
        </Grid>
      </div>
    </>
  );
};
