import { Box, Typography, useTheme } from "@mui/material";
import useFooterVisibility from "../hooks/useFooterVisibility";

function Footer() {
  const showFooter = useFooterVisibility();
  const theme = useTheme();

  return (
    <footer
      style={{ backgroundColor: theme.palette.primary.main, padding: "20px 0" }}
    >
      <Box
        sx={{
          display: showFooter ? "block" : "none",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          &copy; 2025 BoardSWap. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
