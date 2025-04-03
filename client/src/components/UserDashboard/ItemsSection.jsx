import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const ItemsSection = ({
  items,
  itemsError,
  visibleItems,
  handleDeleteClick,
  handleShowMoreItems,
  handleShowLessItems,
}) => (
  <Box sx={{ py: "20px", px: "80px" }}>
    <Typography
      variant="h5"
      color="textSecondary"
      sx={{
        textAlign: "left",
        paddingTop: "20px",
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
            justifyContent: "center",
          }}
        >
          {" "}
          {items.slice(0, visibleItems).map((item) => (
            <Card
              key={item._id}
              sx={{ width: "300px", display: "flex", flexDirection: "column" }}
            >
              <CardContent
                sx={{
                  flex: "1 1 calc(33.33% - 16px)",
                  minWidth: "280px",
                  maxWidth: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
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
                    }}
                  />
                )}
                <Typography color="textSecondary" sx={{ fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography color="textSecondary">
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

                {item.status !== "Sold" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(item)}
                    sx={{ marginTop: "auto" }}
                  >
                    Delete
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          style={{
            marginTop: "10px",
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

ItemsSection.propTypes = {
  items: PropTypes.array.isRequired,
  itemsError: PropTypes.string,
  visibleItems: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleShowMoreItems: PropTypes.func.isRequired,
  handleShowLessItems: PropTypes.func.isRequired,
};

export default ItemsSection;
