import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Box, Typography, CircularProgress } from "@mui/material";
import UserSettings from "./User";
import ItemsSection from "../../components/UserDashboard/ItemsSection";
import OrdersSection from "../../components/UserDashboard/OrdersSection";
import DeleteConfirmationDialog from "../../components/UserDashboard/DeleteConfirmationDialog";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const history = useNavigate();
  const { token, userId, userName } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const {
    isLoading: isLoadingItems,
    error: itemsError,
    performFetch: fetchItems,
  } = useFetch(
    `/users/${userId}/items`,
    (data) => setItems(data.items || []),
    null,
    token,
  );

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
      fetchItems();
      fetchOrders();
      setIsDataFetched(true);
    }
  }, [userId, token, isDataFetched, fetchItems, fetchOrders]);

  useEffect(() => {
    if (itemsError || ordersError) {
      setError(itemsError || ordersError);
    }
  }, [itemsError, ordersError]);

  const handleDeleteItem = async () => {
    if (itemToDelete && token) {
      try {
        await fetch(`/api/items/${itemToDelete._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        fetchItems();
        setShowDeleteItemModal(false);
      } catch (error) {
        console.error("Failed to delete item", error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2, position: "relative", minHeight: "100vh" }}>
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 9999 }}>
        <IconButton
          color="secondary"
          size="large"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          sx={{
            backgroundColor: "white",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <SettingsIcon fontSize="inherit" sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          Hi, {userName || "User"}!
        </Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {isSettingsOpen ? (
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
            Account Settings
          </Typography>
          <UserSettings />
        </Box>
      ) : (
        <>
          {isLoadingItems || isLoadingOrders ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <ItemsSection
                items={items}
                visibleItems={visibleItems}
                handleDeleteClick={(item) => {
                  setItemToDelete(item);
                  setShowDeleteItemModal(true);
                }}
                handleShowMoreItems={() => setVisibleItems(visibleItems + 3)}
                handleShowLessItems={() => setVisibleItems(3)}
              />

              <OrdersSection
                orders={orders}
                visibleOrders={visibleOrders}
                handleShowMoreOrders={() => setVisibleOrders(visibleOrders + 3)}
                handleShowLessOrders={() => setVisibleOrders(3)}
              />
            </>
          )}
        </>
      )}

      <DeleteConfirmationDialog
        open={showDeleteItemModal}
        onClose={() => setShowDeleteItemModal(false)}
        onConfirmDelete={handleDeleteItem}
      />
    </Box>
  );
};

export default UserProfile;
