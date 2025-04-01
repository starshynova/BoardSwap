import express from "express";
import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  updateUserPatch,
  deleteUser,
  getUserOrders,
  getUserItems,
} from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", authMiddleware, getUserById);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.patch("/:id", authMiddleware, updateUserPatch);
userRouter.delete("/:id", authMiddleware, deleteUser);

userRouter.get("/:id/orders", authMiddleware, getUserOrders);

userRouter.get("/:id/items", authMiddleware, getUserItems);

export default userRouter;
