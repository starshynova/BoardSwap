import { useState, useContext, useCallback } from "react";
import {
  Box,
  styled,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchBar from "./SearchBar/SearchBar";
import { useUIContext } from "../context/UIContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "0px",
  paddingRight: "0px",
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
  height: "auto",
  width: "auto",
});

const Nav = () => {
  const { cart, setShowCart } = useUIContext();
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(
    (event) => {
      if (token) {
        setAnchorEl(event.currentTarget);
      }
    },
    [token],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMySettings = useCallback(() => {
    if (userId) {
      navigate(`/users/${userId}`);
      handleClose();
    } else {
      navigate("/login");
    }
  }, [navigate, userId, handleClose]);

  const handleDashboard = useCallback(() => {
    navigate("/dashboard");
    handleClose();
  }, [navigate, handleClose]);

  const handleMyOrders = useCallback(() => {
    navigate("/myorders");
    handleClose();
  }, [navigate, handleClose]);

  const handleCartClick = useCallback(() => {
    setShowCart(true);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        height: "80px",
        justifyContent: "center",
        paddingLeft: "56px",
        paddingRight: "52px",
      }}
    >
      <StyledToolbar>
        <Link to="/">
          <Logo src="/Logo.svg" alt="Logo" />
        </Link>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
          }}
        >
          <SearchBar />
        </Box>
        <Icons sx={{ display: "flex", columnGap: "10px" }}>
          <Link to="/items/create">
            <Tooltip title="Create a new item">
              <IconButton aria-label="create">
                <AddCircleIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Shopping cart">
            <IconButton aria-label="cart" onClick={handleCartClick}>
              <Badge badgeContent={cart.length} color="secondary">
                <AddShoppingCartIcon
                  sx={{ color: "white", fontSize: "30px" }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          {token ? (
            <>
              <Tooltip title="User menu">
                <IconButton
                  aria-label="user"
                  onClick={handleClick}
                  sx={{ color: "white" }}
                >
                  <PersonIcon sx={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "user-button" }}
              >
                <MenuItem onClick={handleMySettings} sx={{ color: "black" }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleDashboard} sx={{ color: "black" }}>
                  My Items
                </MenuItem>

                <MenuItem onClick={handleMyOrders} sx={{ color: "black" }}>
                  My Orders
                </MenuItem>
                <MenuItem sx={{ color: "black" }}>
                  <Logout />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login">
              <Tooltip title="Login">
                <IconButton aria-label="login" sx={{ color: "grey" }}>
                  <PersonIcon sx={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
