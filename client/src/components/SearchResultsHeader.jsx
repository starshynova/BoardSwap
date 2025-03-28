import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const SearchResultsHeader = ({ searchQuery }) => {
  return (
    <>
      <Typography
        variant="h5"
        color="secondary"
        gutterBottom
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {searchQuery ? `Search results for: "${searchQuery}"` : "All Products"}
      </Typography>
    </>
  );
};

SearchResultsHeader.propTypes = {
  searchQuery: PropTypes.string,
};

export default SearchResultsHeader;
