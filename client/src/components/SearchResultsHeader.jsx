import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const SearchResultsHeader = ({ searchQuery, products }) => {
  return (
    <>
      <Typography variant="h5" color="secondary" gutterBottom>
        {searchQuery ? `Search results for: "${searchQuery}"` : "All Products"}
      </Typography>
      {products.length === 0 && searchQuery && (
        <Typography
          variant="h6"
          color="error"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          There is no item according to your search: {searchQuery}
        </Typography>
      )}
    </>
  );
};

SearchResultsHeader.propTypes = {
  searchQuery: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default SearchResultsHeader;
