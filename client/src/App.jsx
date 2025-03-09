import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/register" element={<CreateUser />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
