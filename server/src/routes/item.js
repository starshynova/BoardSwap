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
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", authMiddleware, updateItem);
itemRouter.delete("/:id", authMiddleware, deleteItem);
itemRouter.get("/search", searchItems);

export default itemRouter;
