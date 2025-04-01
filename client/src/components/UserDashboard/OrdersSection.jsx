import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";

const OrdersSection = ({
  orders,
  visibleOrders,
  handleShowMoreOrders,
  handleShowLessOrders,
}) => (
  <div>
    <Typography variant="h5" color="textPrimary" align="center">
      Your Orders
    </Typography>

    {orders.length === 0 ? (
      <Typography color="textSecondary" align="center">
        You have not placed any orders yet.
      </Typography>
    ) : (
      <>
        <Grid container spacing={2}>
          {orders.slice(0, visibleOrders).map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Order #{order._id}</Typography>
                  <Typography color="textSecondary">
                    <strong>Total Price:</strong> €{order.total_price}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Buyer:</strong> {order.firstName} {order.lastName}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Email:</strong> {order.email}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Shipping Address:</strong> {order.address},{" "}
                    {order.city}, {order.postcode}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: "10px" }}>
                    Items Purchased:
                  </Typography>
                  {order.items.map((item) => (
                    <div key={item._id} style={{ marginBottom: "10px" }}>
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
                      <Typography variant="subtitle1">
                        <strong>{item.title}</strong>
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
                    </div>
                  ))}
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

OrdersSection.propTypes = {
  orders: PropTypes.array.isRequired,
  visibleOrders: PropTypes.number.isRequired,
  handleShowMoreOrders: PropTypes.func.isRequired,
  handleShowLessOrders: PropTypes.func.isRequired,
};

export default OrdersSection;
