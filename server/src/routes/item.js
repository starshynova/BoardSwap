import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} from "../controllers/item.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const itemRouter = express.Router();

itemRouter.post("/", authMiddleware, createItem);
itemRouter.get("/", getItems);
itemRouter.get("/search", searchItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", authMiddleware, updateItem);
itemRouter.delete("/:id", authMiddleware, deleteItem);

export default itemRouter;
