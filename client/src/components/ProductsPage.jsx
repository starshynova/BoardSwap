import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import useFetch from "../hooks/useFetch";
import { useUIContext } from "../context/UIContext";
import { useSearch } from "../context/SearchContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useUIContext();
  const { searchQuery } = useSearch();
  const { isLoading, error, performFetch } = useFetch(
    "/items",
    (data) => {
      if (data.success) {
        setProducts(data.result);
      }
    },
    searchQuery,
  );

  useEffect(() => {
    performFetch();
  }, [searchQuery]);

  const toggleCartItem = (product) => {
    setCart((prevCart) => {
      const isAlreadyInCart = prevCart.some((item) => item._id === product._id);
      return isAlreadyInCart
        ? prevCart.filter((item) => item._id !== product._id)
        : [...prevCart, product];
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "80px" }}>
      <Typography variant="h5" color="secondary" gutterBottom></Typography>
      <Grid container spacing={6}>
        {products.map((product) => {
          const isInCart = cart.some((item) => item._id === product._id);

          return (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card sx={{ boxShadow: 2, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.photo}
                  alt={product.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.status}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color={isInCart ? "error" : "primary"}
                    onClick={() => toggleCartItem(product)}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProductsPage;
