import mongoose from "mongoose";
import User, { validateUser } from "../models/user-model.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import Item from "../models/item-model.js";
import Order from "../models/order-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;

    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: `Invalid user data. Please ensure you're sending the correct information.: ${JSON.stringify(user)}`,
      });
    }

    const errorList = validateUser(user);
    if (errorList.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    }

    const isEmailAvailable = await getUserByEmail(user.email);
    if (isEmailAvailable) {
      return res.status(400).json({
        success: false,
        msg: "This email is already registered. Please use a different email.",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      created_date: new Date(),
      post_code: user.post_code || null, // Optional fields
      city: user.city || null, // Optional fields
    };

    const insertedUser = await User.create(newUser);

    return res.status(201).json({
      success: true,
      user: {
        email: insertedUser.email,
        name: insertedUser.name,
        post_code: insertedUser.post_code,
        city: insertedUser.city,
        created_date: insertedUser.created_date,
      },
    });
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide your e-mail address and password.",
    });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid e-mail address of user." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid e-mail / password combination." });
  }

  try {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      {
        expiresIn: "7h",
      },
    );
    return res.status(200).json({ success: true, token });
  } catch (err) {
    logError(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error." });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: "Unable to get user by ID, try again later",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  let userUpdates = req.body;

  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, msg: "User not authenticated. Please log in." });
  }

  if (req.user.id !== id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can only update your own profile" });
  }

  if (userUpdates._id) {
    delete userUpdates._id;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userUpdates },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Unable to update user, try again later" });
  }
};

export const updateUserPatch = async (req, res) => {
  const { id } = req.params;
  const userUpdates = req.body; // partial updates

  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, msg: "User not authenticated. Please log in." });
  }

  if (req.user.id !== id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can only update your own profile" });
  }

  if (userUpdates._id) {
    delete userUpdates._id;
  }

  if (userUpdates.post_code === "") {
    userUpdates.post_code = null;
  }
  if (userUpdates.city === "") {
    userUpdates.city = null;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: "Unable to update user, please try again later.",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid user ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (deletedUser.items && deletedUser.items.length > 0) {
      await Item.deleteMany({ _id: { $in: deletedUser.items } });
    }

    if (deletedUser.orders && deletedUser.orders.length > 0) {
      await Order.deleteMany({ _id: { $in: deletedUser.orders } });
    }

    return res.status(200).json({
      success: true,
      msg: "User and associated items and orders deleted successfully",
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: "Unable to delete user, try again later",
    });
  }
};

export const getUserItems = async (req, res) => {
  try {
    const { id } = req.user;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid user ID format." });
    }

    const user = await User.findById(id).populate({
      path: "items",
      select:
        "title price type condition photo description status created_date",
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    return res.status(200).json({ success: true, items: user.items || [] });
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Error fetching items." });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid user ID format." });
    }
    const userOrders = await Order.find({ user_id: id })
      .populate({
        path: "items",
        select: "title price description",
      })
      .select("items total_price address createdAt");

    if (!userOrders || userOrders.length === 0) {
      return res.status(200).json({ success: true, orders: [] });
    }

    return res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error fetching orders." });
  }
};
