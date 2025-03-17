import { Grid, styled } from "@mui/material";
import { useUIContext } from "../context/UIContext";
import ProductCard from "../components/ProductCard";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import HorizontalNonLinearStepper from "../components/Stepper";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();
  const StyledProductCard = styled(ProductCard)`
    border: 2px solid blue;
    background-color: #f0f8ff;
  `;
  return (
    <>
      <div style={{ padding: "20px 80px" }}>
        <h1>Order</h1>
        <HorizontalNonLinearStepper />
        <div>
          <p>Items in cart: {cart.length}</p>
          <Grid container spacing={6}>
            {cart.map((product) => (
              <StyledProductCard
                key={product._id}
                product={product}
                isInCart={cart.some((item) => item._id === product._id)}
                toggleCartItem={toggleCartItem}
              />
            ))}{" "}
          </Grid>
          <PaymentForm />
        </div>
      </div>
    </>
  );
};
