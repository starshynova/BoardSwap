import { useEffect, useState } from "react";
import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useUIContext } from "../../context/UIContext";
import { useSearch } from "../../context/SearchContext";
import ProductList from "../../components/ProductList";
import SearchResultsHeader from "../../components/SearchResultsHeader";
import CenteredTabs from "../../components/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, toggleCartItem } = useUIContext();
  const { searchQuery } = useSearch();
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, error, performFetch } = useFetch(
    `/items`,
    (data) => {
      if (data.success) {
        const availableProducts = data.result.filter(
          (product) => product.status === "Available",
        );

        setProducts(availableProducts);
      }
    },
    searchQuery,
    null,
    type === "All" ? "" : type,
    sort,
  );

  useEffect(() => {
    performFetch();

    if (location.state?.fromOrder) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.key, searchQuery, type, sort]);

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  const handleTabChange = (event, newType) => {
    setType(newType);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ px: "80px", pt: "20px", pb: "50px" }}>
      <CenteredTabs onTabChange={handleTabChange} selectedType={type} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mt: 1,
        }}
      >
        <SearchResultsHeader searchQuery={searchQuery} products={products} />
        <SortDropdown sortValue={sort} onSortChange={handleSortChange} />
      </Box>
      <Box sx={{ mt: 4 }}>
        {products.length === 0 && searchQuery ? (
          <Typography
            variant="h6"
            color="error"
            textAlign="center"
            sx={{ mt: 8 }}
          >
            There is no item according to your search: {searchQuery}
          </Typography>
        ) : (
          <ProductList
            products={products}
            cart={cart}
            toggleCartItem={toggleCartItem}
          />
        )}
      </Box>
    </Box>
  );
};

Home.propTypes = {
  searchQuery: PropTypes.string,
};
export default Home;
