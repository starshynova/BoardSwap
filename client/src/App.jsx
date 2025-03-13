import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Nav from "./components/Nav";
import theme from "./components/theme";
import UIProvider from "./context/UIProvider";
import { SearchProvider } from "./context/SearchContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <SearchProvider>
      <UIProvider>
        <ThemeProvider theme={theme}>
          <Nav />
          <AppRoutes />
        </ThemeProvider>
      </UIProvider>
    </SearchProvider>
  );
};

export default App;
