import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Box, Typography } from "@mui/material";
import OrdersSection from "../../components/UserDashboard/OrdersSection";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const history = useNavigate();
  const { token, userId, userName } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const {
    isLoading: isLoadingOrders,
    error: ordersError,
    performFetch: fetchOrders,
  } = useFetch(
    `/users/${userId}/orders`,
    (data) => setOrders(data.orders || []),
    null,
    token,
  );

  useEffect(() => {
    if (!userId || !token) {
      history("/login");
    }
  }, [userId, token, history]);

  useEffect(() => {
    if (userId && token && !isDataFetched) {
      fetchOrders();
      setIsDataFetched(true);
    }
  }, [userId, token, isDataFetched, fetchOrders]);

  useEffect(() => {
    if (ordersError) {
      setError(ordersError);
    }
  }, [ordersError]);

  const generateOrderNumber = (index) => {
    return `#${(index + 1).toString().padStart(4, "0")}`;
  };

  const ordersWithNumbers = orders.map((order, index) => ({
    ...order,
    orderNumber: generateOrderNumber(index),
  }));

  const sortedOrders = [...ordersWithNumbers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <Box sx={{ padding: 2, position: "relative", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="h2" color="secondary">
          Hi, {userName || "User"}!
        </Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {isLoadingOrders ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <OrdersSection
            orders={sortedOrders}
            visibleOrders={visibleOrders}
            handleShowMoreOrders={() => setVisibleOrders(visibleOrders + 3)}
            handleShowLessOrders={() => setVisibleOrders(3)}
          />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
