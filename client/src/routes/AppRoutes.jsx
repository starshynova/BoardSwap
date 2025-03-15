import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CreateUser from "../pages/User/CreateUser";
import Login from "../pages/User/Login";
import UserList from "../pages/User/UserList";
import CreateItem from "../pages/Item/CreateItem";
import NotFound from "../pages/NotFound/NotFound";
import ItemDetails from "../pages/Item/ItemDetails";
import EditItem from "../pages/Item/EditItem";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route path="*" element={<NotFound />} />
      <Route path="items/edit/:id" element={<EditItem />} />
    </Routes>
  );
};

AppRoutes.propTypes = {
  searchQuery: PropTypes.string,
};

export default AppRoutes;
