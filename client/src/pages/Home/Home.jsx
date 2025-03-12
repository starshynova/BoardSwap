import TEST_ID from "./Home.testid";
// import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import Cart from "../../components/cart";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useUIContext } from "../../context/UIContext";
import { useSearch } from "../../context/SearchContext";
import ProductList from "../../components/ProductList";
import SearchResultsHeader from "../../components/SearchResultsHeader";

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
      <Box sx={{ mt: 4 }}>
        <div>
          {/* <SortDropdown /> */}
          <div style={{ padding: "80px" }}>
            <>
              <SearchResultsHeader
                searchQuery={searchQuery}
                products={products}
              />
              <ProductList
                products={products}
                cart={cart}
                toggleCartItem={toggleCartItem}
              />
            </>
          </div>

          <Cart />
        </div>
      </Box>
    </div>
  );
};

Home.propTypes = {
  searchQuery: PropTypes.string,
};
export default Home;
