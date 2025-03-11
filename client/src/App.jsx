import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import Login from "./pages/User/Login";
import UserList from "./pages/User/UserList";
import CreateItem from "./pages/Item/CreateItem";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import UIProvider from "./context/UIProvider";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UIProvider>
      <ThemeProvider theme={theme}>
        <Nav onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
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
