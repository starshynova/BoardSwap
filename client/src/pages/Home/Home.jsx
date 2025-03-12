import TEST_ID from "./Home.testid";
import CenteredTabs from "../../components/Tabs";
// import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import Cart from "../../components/cart";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useUIContext } from "../../context/UIContext";
import { useSearch } from "../../context/SearchContext";

const Home = () => {
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
    <div data-testid={TEST_ID.container}>
      <div>
        <CenteredTabs />
        {/* <SortDropdown /> */}
        <div style={{ padding: "80px" }}>
          <Typography variant="h5" color="secondary" gutterBottom>
            {searchQuery
              ? `Search results for: "${searchQuery}"`
              : "All Products"}
          </Typography>
          {products.length === 0 && searchQuery ? (
            <Typography
              variant="h6"
              color="error"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              There is no item according to your search: {searchQuery}
            </Typography>
          ) : (
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
          )}
        </div>
        );
        <Cart />
      </div>
    </div>
  );
};

Home.propTypes = {
  searchQuery: PropTypes.string,
};
export default Home;
