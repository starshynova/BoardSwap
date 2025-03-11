import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import Login from "./pages/User/Login";
import UserList from "./pages/User/UserList";
import CreateItem from "./pages/Item/CreateItem";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";
import UIProvider from "./context/UIProvider";

const App = () => {
  return (
    <UIProvider>
      <ThemeProvider theme={theme}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/register" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items/create" element={<CreateItem />} />
        </Routes>
      </ThemeProvider>
    </UIProvider>
  );
};

export default App;
