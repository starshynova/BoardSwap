import { ThemeProvider } from "@mui/material/styles";
import Nav from "./components/Nav";
import theme from "./components/theme";
import UIProvider from "./context/UIProvider";
import { SearchProvider } from "./context/SearchContext";
import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <UIProvider>
          <ThemeProvider theme={theme}>
            <Nav />
            <Cart />
            <AppRoutes />
          </ThemeProvider>
        </UIProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
