import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CreateUser from "../pages/User/CreateUser";
import Login from "../pages/User/Login";
import UserList from "../pages/User/UserList";
import CreateItem from "../pages/Item/CreateItem";
import NotFound from "../pages/NotFound/NotFound";
import { Order } from "../pages/Order/Order";
import ItemDetails from "../pages/Item/ItemDetails";
import EditItem from "../pages/Item/EditItem";
import PrivateRoute from "./PrivateRoute";
// import UserProfile from "../pages/User/Profile";
import UserProfile from "../pages/User/UserProfile";
import UserProfileEdit from "../pages/User/UserProfileEdit";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/order" element={<Order />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/users/edit/:id" element={<UserProfileEdit />} />

      {/* protected routes */}
      <Route
        path="/items/create"
        element={
          <PrivateRoute>
            <CreateItem />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/user/:id"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      /> */}

      <Route path="*" element={<NotFound />} />
      <Route path="items/edit/:id" element={<EditItem />} />
    </Routes>
  );
};

export default AppRoutes;
