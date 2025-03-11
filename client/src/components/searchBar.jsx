import { InputBase, InputAdornment, styled, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import PropTypes from "prop-types";

const SearchContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  width: "40%",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  border: "1.5px solid ",
  borderColor: theme.palette.secondary.main,
  flex: 1,
}));

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "50%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.secondary.main,
  backgroundColor: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };
  return (
    <Wrapper>
      <SearchContainer>
        <InputBase
          placeholder="Search ..."
          sx={{ color: "gray", flex: 1 }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchContainer>

      <StyledButton variant="outlined" onClick={handleSearch}>
        Search
      </StyledButton>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
