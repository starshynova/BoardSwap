import { Box, Typography, useTheme } from "@mui/material";

function Footer() {
  const theme = useTheme();

  return (
    <footer
      style={{
        backgroundColor: theme.palette.primary.main,
        padding: "20px 0",
        marginTop: "auto",
        paddingTop: "20px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          &copy; 2025 BoardSwap. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
