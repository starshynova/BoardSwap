import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ImageListItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import formStyle from "../util/formStyle";

const token = localStorage.getItem("authToken");

const ItemDetailsForm = ({
  data,
  isInCart,
  toggleCartItem,
  handleDelete,
  deleteSuccess,
  handleEdit,
}) => {
  const [isSeller, setIsSeller] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id === data.seller_id) {
        setIsSeller(true);
      }
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, []);

  return (
    <Box sx={formStyle.boxBig}>
      <List sx={formStyle.list}>
        <Typography variant="h4" textAlign="center" mb={2}>
          {data.title}
        </Typography>

        <ImageListItem sx={{ width: "300px" }}>
          <img src={data.photo} alt={data.title} />
        </ImageListItem>

        <ListItem sx={{ ...formStyle.listItem, mt: 5 }}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Price
            </Typography>
          </Box>
          <Typography variant="h6">{data.price} €</Typography>
        </ListItem>
        <Divider component="li" sx={formStyle.divider} />
        <ListItem sx={formStyle.listItem}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Category
            </Typography>
          </Box>

          <Typography variant="h6">{data.type}</Typography>
        </ListItem>
        <Divider component="li" sx={formStyle.divider} />
        <ListItem sx={formStyle.listItem}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Condition
            </Typography>
          </Box>
          <Typography variant="h6">{data.condition}</Typography>
        </ListItem>
        <Divider component="li" sx={formStyle.divider} />

        {data.description && (
          <Box style={{ width: "100%" }}>
            <ListItem sx={{ ...formStyle.listItem, alignItems: "flex-start" }}>
              <Box sx={{ width: "160px", flexShrink: 0 }}>
                <Typography variant="h6" fontWeight="bold">
                  Description
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ wordBreak: "break-word", flex: 1 }}
              >
                {data.description}
              </Typography>
            </ListItem>
            <Divider component="li" sx={formStyle.divider} />
          </Box>
        )}
      </List>

      {!isSeller ? (
        <Button
          variant={isInCart ? "outlined" : "contained"}
          color={isInCart ? "secondary" : "primary"}
          onClick={() => toggleCartItem(data)}
          sx={formStyle.buttonMiddle}
          size="large"
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      ) : (
        <div style={{ display: "flex", gap: "40px" }}>
          <Button
            variant="outlined"
            color="red"
            size="large"
            sx={formStyle.buttonSmall}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </Button>
          <Dialog
            open={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
          >
            <Box sx={formStyle.dialog}>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText color="red" textAlign={"center"}>
                  Are you sure you want to delete your product? This action
                  cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="red"
                  size="large"
                  sx={formStyle.buttonSmall}
                >
                  Yes, Delete
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="contained"
                  color="primary"
                  sx={formStyle.buttonSmall}
                  size="large"
                >
                  No, Cancel
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
          <Button
            variant="outlined"
            color="secondary"
            sx={formStyle.buttonSmall}
            size="large"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      )}
      {deleteSuccess && (
        <Typography color="green" sx={{ mt: 2 }}>
          Item was successfully deleted
        </Typography>
      )}
    </Box>
  );
};

ItemDetailsForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    description: PropTypes.string,
    seller_id: PropTypes.string.isRequired,
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default ItemDetailsForm;
