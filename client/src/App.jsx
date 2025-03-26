import { ThemeProvider } from "@mui/material/styles";
import Nav from "./components/Nav";
import theme from "./components/theme";
import UIProvider from "./context/UIProvider";
import { SearchProvider } from "./context/SearchContext";
import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  return (
    <AuthProvider>
      <SearchProvider>
        <UIProvider>
          <ThemeProvider theme={theme}>
            {/* Conditionally render Nav-bar based on the route */}
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && <Nav />}
            <Cart />
            <AppRoutes />
            <Footer />
          </ThemeProvider>
        </UIProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
