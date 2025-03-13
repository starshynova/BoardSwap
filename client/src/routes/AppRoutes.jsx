import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CreateUser from "../pages/User/CreateUser";
import Login from "../pages/User/Login";
import UserList from "../pages/User/UserList";
import CreateItem from "../pages/Item/CreateItem";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

AppRoutes.propTypes = {
  searchQuery: PropTypes.string,
};

export default AppRoutes;
