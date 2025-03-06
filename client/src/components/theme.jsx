import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#47CAD1",
    },
    secondary: {
      main: "#36999F",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },
  },
  typography: {
    h5: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
});

export default theme;
