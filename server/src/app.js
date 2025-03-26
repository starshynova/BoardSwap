import express from "express";
import cors from "cors";
import userRouter from "./routes/user-route.js";
import itemRouter from "./routes/item-route.js";
import orderRouter from "./routes/order-route.js";

// Create an express server
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
  }),
);
// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRouter);

export default app;
