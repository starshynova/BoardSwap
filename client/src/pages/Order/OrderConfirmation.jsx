import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useUIContext } from "../../context/UIContext";
import { Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { cart, setCart } = useUIContext();

  console.log("Order confirmation, items in the cart", cart);
  const navigate = useNavigate();

  const totalAmount = useMemo(() => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  }, [cart]);

  const navigateToHome = () => {
    navigate("/");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        color: "black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List>
        {cart.map((item) => (
          <Fragment key={item._id}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar
                  alt={item.title}
                  src={item.photo}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                  }}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                sx={{ paddingLeft: "20px", color: "black" }}
                primary={item.title}
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Type: {item.type}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Condition: {item.condition}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Price: €{item.price}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Fragment>
        ))}
        <Typography variant="h6" sx={{ padding: "10px 20px" }}>
          Total amount: €{totalAmount}
        </Typography>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToHome}
        sx={{
          mt: 2,
          alignSelf: "center",
          color: "white",
          px: 4,
          py: 1,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Back to BoardSwap
      </Button>
    </Box>
  );
};

export default OrderConfirmation;
