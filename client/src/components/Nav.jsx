import { Box, styled, Toolbar, IconButton, Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchBar from "./searchBar";
import PropTypes from "prop-types";
import { useUIContext } from "../context/UIContext";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
}));

const Icons = styled(Box)(({ theme }) => ({
  color: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
}));

const Logo = styled("img")({
  height: 50,
  width: "auto",
});

const Nav = ({ onSearch }) => {
  const { cart, setShowCart } = useUIContext();

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <StyledToolbar>
        <Logo src="/Logo.png" alt="Logo" />
        <SearchBar onSearch={onSearch} />
        <Icons>
          <Link to={"/items/create"}>
            <IconButton aria-label="create">
              <AddCircleIcon sx={{ color: "white" }} />
            </IconButton>
          </Link>
          <IconButton aria-label="cart" onClick={() => setShowCart(true)}>
            <Badge badgeContent={cart.length} color="error">
              <AddShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
          <IconButton aria-label="user">
            <PersonIcon sx={{ color: "white" }} />
          </IconButton>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};
Nav.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Nav;
