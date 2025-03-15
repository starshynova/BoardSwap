import { useEffect, useState } from "react";
import TEST_ID from "./Home.testid";
import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import Cart from "../../components/Cart/cart";
import { Box } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useUIContext } from "../../context/UIContext";
import { useSearch } from "../../context/SearchContext";
import ProductList from "../../components/ProductList";
import SearchResultsHeader from "../../components/SearchResultsHeader";
import CenteredTabs from "../../components/Tabs";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, toggleCartItem } = useUIContext();
  const { searchQuery } = useSearch();
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("");
  const { isLoading, error, performFetch } = useFetch(
    `/items`,
    (data) => {
      if (data.success) {
        setProducts(data.result);
      }
    },
    searchQuery,
    null,
    type === "All" ? "" : type,
    sort,
  );

  useEffect(() => {
    performFetch();
  }, [searchQuery, type, sort]);

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
              <SortDropdown sortValue={sort} onSortChange={handleSortChange} />
              <br />
              <br />
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
