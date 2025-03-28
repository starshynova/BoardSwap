import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#47CAD1",
    },
    secondary: {
      main: "#36999F",
    },

    blue: {
      main: "#200AC9",
      contrastText: "#ffffff",
      hover: "#17097F",
    },
    red: {
      main: "#BE0B0B",
      contrastText: "#ffffff",
      hover: "#960101",
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
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "red" },
          style: {
            "&:hover": {
              backgroundColor: "#960101",
            },
          },
        },
        {
          props: { color: "blue" },
          style: {
            "&:hover": {
              backgroundColor: "#17097F",
            },
          },
        },
      ],
    },
  },
});

export default theme;
