import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#47CAD1",
    },
    secondary: {
      main: "#178388",
    },
    red: {
      main: "#BE0B0B",
      contrastText: "#ffffff",
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
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: "#36999F",
            color: "#36999F",
            "&:hover": {
              borderColor: "#2A7C81",
              backgroundColor: "#94E4EB",
              color: "#2A7C81",
            },
          },
        },
        {
          props: { variant: "outlined", color: "red" },
          style: {
            borderColor: "#BE0B0B",
            color: "#BE0B0B",
            "&:hover": {
              borderColor: "#810D0D",
              backgroundColor: "#FFCFCF",
              color: "#810D0D",
            },
          },
        },
      ],
      styleOverrides: {
        outlined: {
          borderWidth: "3px",
          borderStyle: "solid",
          boxSizing: "border-box",
        },
        contained: {
          borderWidth: "2px",
          borderColor: "transparent",
          borderStyle: "solid",
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default theme;
