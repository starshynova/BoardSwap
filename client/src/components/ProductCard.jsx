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
import ShareButton from "./ShareButton";

const ProductCard = ({ product, isInCart, toggleCartItem, isOrderStage }) => {
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
      <Card sx={{ position: "relative", ...formStyle.card }}>
        {!isOrderStage && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 1,
            }}
          >
            <ShareButton item={{ id: product._id, title: product.title }} />
          </Box>
        )}

        <CardContent>
          <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={product.photo}
                alt={product.title}
                sx={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  mb: 5,
                }}
              />
            </Box>

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

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isInCart: PropTypes.bool.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
  isOrderStage: PropTypes.bool.isRequired,
};

export default ProductCard;
