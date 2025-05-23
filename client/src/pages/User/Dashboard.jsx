import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import ItemsSection from "../../components/UserDashboard/ItemsSection";
import DeleteConfirmationDialog from "../../components/UserDashboard/DeleteConfirmationDialog";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import Heading from "../../components/Heading";

const Dashboard = () => {
  const history = useNavigate();
  const { token, userId, userName } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [visibleItems, setVisibleItems] = useState(3);
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

  useEffect(() => {
    if (!userId || !token) {
      history("/login");
    }
  }, [userId, token, history]);

  useEffect(() => {
    if (userId && token && !isDataFetched) {
      fetchItems();
      setIsDataFetched(true);
    }
  }, [userId, token, isDataFetched, fetchItems]);

  useEffect(() => {
    if (itemsError) {
      setError(itemsError);
    }
  }, [itemsError]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Heading>Hi, {userName || "User"}!</Heading>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {isLoadingItems ? (
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

export default Dashboard;
