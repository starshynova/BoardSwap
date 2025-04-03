import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const ItemsSection = ({
  items,
  itemsError,
  visibleItems,
  handleDeleteClick,
  handleShowMoreItems,
  handleShowLessItems,
}) => (
  <div>
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
        <Grid container spacing={2}>
          {items.slice(0, visibleItems).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardContent>
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
                  <Typography variant="h6">{item.title}</Typography>
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
                    >
                      Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <div
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
        </div>
      </>
    )}
  </div>
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
