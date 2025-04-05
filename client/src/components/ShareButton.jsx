import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem, Box, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import MuiAlert from "@mui/material/Alert";

const ShareButton = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const open = Boolean(anchorEl);

  const shareUrl = `${window.location.origin}/items/${item?.id}`;
  const message = `Check out this game: ${item?.title}`;
  const whatsappWebUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(`${message} ${shareUrl}`)}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setSnackbarMessage("Link copied to clipboard!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to copy the link. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
    handleClose();
  };

  const handleWhatsAppShare = () => {
    const newWindow = window.open(whatsappWebUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      setSnackbarMessage("Popup blocked. Please allow popups and try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          minWidth: "auto",
          padding: "6px",
          borderRadius: "0%",
          color: "primary.main",
        }}
      >
        <ShareIcon sx={{ color: "primary.main" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ "& .MuiPaper-root": { backgroundColor: "#fff", color: "#000" } }}
      >
        <MenuItem onClick={handleWhatsAppShare} sx={{ color: "#000" }}>
          <WhatsAppIcon sx={{ marginRight: 1, color: "#25D366" }} /> Share on
          WhatsApp
        </MenuItem>
        <MenuItem onClick={handleCopyLink} sx={{ color: "#000" }}>
          <LinkIcon sx={{ marginRight: 1, color: "#000" }} /> Copy Link
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

ShareButton.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareButton;
