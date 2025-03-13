import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/item-controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const itemRouter = express.Router();

itemRouter.post("/create", authMiddleware, createItem);
itemRouter.get("/", getItems);
itemRouter.get("/search", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", authMiddleware, updateItem);
itemRouter.delete("/:id", authMiddleware, deleteItem);

export default itemRouter;
