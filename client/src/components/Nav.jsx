import { useState, useContext } from "react";
import {
  Box,
  styled,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchBar from "./SearchBar/SearchBar";
import PropTypes from "prop-types";
import { useUIContext } from "../context/UIContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

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
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (token) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <StyledToolbar>
        <Link to="/">
          <Logo src="/Logo.png" alt="Logo" />
        </Link>
        <SearchBar onSearch={onSearch} />
        <Icons>
          <Link to="/items/create">
            <IconButton aria-label="create">
              <AddCircleIcon sx={{ color: "white" }} />
            </IconButton>
          </Link>
          <IconButton aria-label="cart" onClick={() => setShowCart(true)}>
            <Badge badgeContent={cart.length} color="error">
              <AddShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>

          {token ? (
            <>
              <IconButton
                aria-label="user"
                onClick={handleClick}
                sx={{ color: "white" }}
              >
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "user-button" }}
              >
                <MenuItem onClick={handleProfile} sx={{ color: "black" }}>
                  Profile
                </MenuItem>
                <MenuItem sx={{ color: "black" }}>
                  <Logout />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login">
              <IconButton aria-label="login" sx={{ color: "gray" }}>
                <PersonIcon />
              </IconButton>
            </Link>
          )}
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

Nav.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Nav;
