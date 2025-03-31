import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import formStyle from "../util/formStyle";

const ProductCard = ({ product, isInCart, toggleCartItem }) => {
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState("");

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (!token) {
      console.error("No token. User not authorised.");
      setValidToken("");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setValidToken(decodedToken.id);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, [token]);

  const handleNavigate = useCallback(() => {
    navigate(`/items/${product._id}`);
  }, [navigate, product._id]);

  const handleToggleCart = useCallback(() => {
    toggleCartItem(product);
  }, [toggleCartItem, product]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={formStyle.card}>
        <CardContent>
          <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
            <CardMedia
              component="img"
              height="200"
              image={product.photo}
              alt={product.title}
              sx={{ objectFit: "contain", mb: 5 }}
            />

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "3.2em",
                wordBreak: "break-word",
              }}
            >
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              €{product.price}
            </Typography>
          </Box>

          {validToken === product.seller_id ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNavigate}
              sx={formStyle.buttonWide}
            >
              View details
            </Button>
          ) : (
            <Button
              variant={isInCart ? "outlined" : "contained"}
              color={isInCart ? "secondary" : "primary"}
              onClick={handleToggleCart}
              sx={
                isInCart
                  ? { ...formStyle.buttonWide, color: "#178388" }
                  : { ...formStyle.buttonWide, color: "#ffffff" }
              }
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isInCart: PropTypes.bool.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};

export default ProductCard;
