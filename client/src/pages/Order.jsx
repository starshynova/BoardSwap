import { Grid } from "@mui/material";
import { useUIContext } from "../context/UIContext";
import ProductCard from "../components/ProductCard";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import HorizontalNonLinearStepper from "../components/Stepper";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();
  return (
    <div style={{ padding: "20px 80px" }}>
      <h1>Order</h1>
      <HorizontalNonLinearStepper />
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
        <PaymentForm />
      </div>
    </div>
  );
};
