import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const OrdersSection = ({
  orders,
  ordersError,
  visibleOrders,
  handleShowMoreOrders,
  handleShowLessOrders,
}) => {
  return (
    <Box sx={{ py: "20px", px: "80px" }}>
      <Typography
        variant="h5"
        color="secondary"
        sx={{ textAlign: "left", paddingBottom: "20px" }}
      >
        My Orders
      </Typography>

      {ordersError && <Typography color="error">{ordersError}</Typography>}
      {orders.length === 0 && !ordersError && (
        <Typography color="textSecondary" align="center">
          You have not placed any orders yet.
        </Typography>
      )}

      {orders.length > 0 && (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {orders.slice(0, visibleOrders).map((order) => (
              <Card
                key={order._id}
                sx={{
                  flex: "0 1 calc(33.33% - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "400px",
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
                  <Box sx={{ mb: "16px" }}>
                    <Typography color="textSecondary">
                      <strong>Order Number:</strong> {order.orderNumber}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Total Price:</strong> €{order.total_price}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Email:</strong> {order.user_id.email}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Shipping Address:</strong> {order.address},{" "}
                      {order.city}, {order.user_id.postcode}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Order Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}>
                    Items Purchased:
                  </Typography>
                  {order.items.map((item) => (
                    <Box
                      key={item._id}
                      sx={{ display: "flex", gap: "10px", mb: "10px" }}
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
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.title}
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
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {visibleOrders < orders.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowMoreOrders}
              >
                Show More
              </Button>
            )}
            {visibleOrders > 3 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleShowLessOrders}
                sx={{ marginLeft: "10px" }}
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

OrdersSection.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersError: PropTypes.string,
  visibleOrders: PropTypes.number.isRequired,
  handleShowMoreOrders: PropTypes.func.isRequired,
  handleShowLessOrders: PropTypes.func.isRequired,
};

export default OrdersSection;
