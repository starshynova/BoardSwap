import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import UserList from "../pages/User/UserList";
import CreateItem from "../pages/Item/CreateItem";
import NotFound from "../pages/NotFound/NotFound";
import { Order } from "../pages/Order/Order";
import ItemDetails from "../pages/Item/ItemDetails";
import EditItem from "../pages/Item/EditItem";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/User/Profile";
import Dashboard from "../pages/User/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route path="/user" element={<UserList />} />

      {/* protected routes */}
      <Route
        path="/items/create"
        element={
          <PrivateRoute>
            <CreateItem />
          </PrivateRoute>
        }
      />

      <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/order"
        element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
      <Route path="items/edit/:id" element={<EditItem />} />
    </Routes>
  );
};

export default AppRoutes;
