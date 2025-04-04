import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import { useNavigate } from "react-router-dom";

const ItemsSection = ({
  items,
  itemsError,
  visibleItems,
  handleDeleteClick,
  handleShowMoreItems,
  handleShowLessItems,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/items/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/items/edit/${id}`);
  };

  return (
    <Box sx={{ py: "20px", px: "80px" }}>
      <Typography
        variant="h5"
        color="secondary"
        sx={{
          textAlign: "left",
          paddingBottom: "20px",
        }}
      >
        My Items
      </Typography>

      {itemsError && <Typography color="error">{itemsError}</Typography>}
      {items.length === 0 && !itemsError && (
        <Typography color="textSecondary" align="center">
          You have not uploaded any items yet.
        </Typography>
      )}

      {items.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {" "}
            {items.slice(0, visibleItems).map((item) => (
              <Card
                key={item._id}
                sx={{
                  flex: "0 1 calc(33.33% - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{ mb: "16px" }}
                    onClick={() => handleNavigate(item._id)}
                  >
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "5px",
                          objectFit: "cover",
                          marginBottom: "16px",
                        }}
                      />
                    )}
                    <Typography
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description || "No description available."}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Price:</strong> €{item.price}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Condition:</strong> {item.condition}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Category:</strong> {item.type}
                    </Typography>

                    {item.status === "Sold" ? (
                      <Typography color="error">
                        <strong>Status:</strong> Sold
                      </Typography>
                    ) : (
                      <Typography color="success.main">
                        <strong>Status:</strong> Available
                      </Typography>
                    )}
                  </Box>
                  {item.status !== "Sold" && (
                    <Box sx={{ display: "flex", gap: "16px;" }}>
                      <DeleteButton onClick={() => handleDeleteClick(item)}>
                        Delete
                      </DeleteButton>
                      <EditButton onClick={() => handleEdit(item._id)}>
                        Edit
                      </EditButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {visibleItems < items.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowMoreItems}
              >
                Show More
              </Button>
            )}
            {visibleItems > 3 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleShowLessItems}
                style={{ marginLeft: "10px" }}
              >
                Show Less
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

ItemsSection.propTypes = {
  items: PropTypes.array.isRequired,
  itemsError: PropTypes.string,
  visibleItems: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleShowMoreItems: PropTypes.func.isRequired,
  handleShowLessItems: PropTypes.func.isRequired,
};

export default ItemsSection;
