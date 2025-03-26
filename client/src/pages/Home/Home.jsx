import { useEffect, useState } from "react";
import TEST_ID from "./Home.testid";
import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useUIContext } from "../../context/UIContext";
import { useSearch } from "../../context/SearchContext";
import ProductList from "../../components/ProductList";
import SearchResultsHeader from "../../components/SearchResultsHeader";
import CenteredTabs from "../../components/Tabs";
import { useLocation, useNavigate } from "react-router-dom";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div data-testid={TEST_ID.container}>
      <Box sx={{ mt: 4 }}>
        <div>
          <div style={{ padding: "20px 80px" }}>
            <>
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
                <SearchResultsHeader
                  searchQuery={searchQuery}
                  products={products}
                />
                <SortDropdown
                  sortValue={sort}
                  onSortChange={handleSortChange}
                />
              </Box>
              <Box sx={{ mt: 4 }}>
                <ProductList
                  products={products}
                  cart={cart}
                  toggleCartItem={toggleCartItem}
                />
              </Box>
            </>
          </div>
        </div>
      </Box>
    </div>
  );
};

Home.propTypes = {
  searchQuery: PropTypes.string,
};
export default Home;
