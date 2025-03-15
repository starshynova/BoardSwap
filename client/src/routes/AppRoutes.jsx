import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CreateUser from "../pages/User/CreateUser";
import Login from "../pages/User/Login";
import UserList from "../pages/User/UserList";
import CreateItem from "../pages/Item/CreateItem";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/User/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateUser />} />
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
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
