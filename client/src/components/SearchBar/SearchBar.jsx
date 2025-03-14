import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearch } from "../../context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SearchContainer,
  StyledButton,
  StyledInputBase,
  Wrapper,
} from "./SearchBar.styles";
import { IconButton, InputAdornment } from "@mui/material";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [query, setQuery] = useState(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(query.trim());

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  return (
    <Wrapper>
      <SearchContainer>
        <StyledInputBase
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            query && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
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
