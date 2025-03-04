import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// We should decide how to store secret key or another way for login (Firebase, for example)
const SECRET = "mysecretkey";
// Lidiia suggestion: I think we don't need getUsers function in our project.
// We need it only to test the database working.
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .send({ error: "Please, provide your e-mail address and password" });
    return;
  }

  const getUserByEmail = (email) => {
    return User.find((user) => user.email === email);
  };
  const user = getUserByEmail(email);
  if (!user) {
    res.status(401).send({ error: "Invalid e-mail address of user" });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).send({ error: "Invalid e-mail / password combination" });
    return;
  }

  try {
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
    res.status(201).send({ token });
    return;
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
    return;
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find((user) => user.id === id);
    res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get user by ID, try again later",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  if (!id) {
    res.status(400).send({ error: "Please, provide user ID" });
    return;
  }
  if (!user) {
    res.status(400).send({ error: "Please, provide user data" });
    return;
  }
  if (typeof user !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
        user,
      )}`,
    });

    return;
  }
  const errorList = validateUser(user);

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update user, try again later" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Please, provide user ID" });
    return;
  }
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    } else {
      res.status(200).json({ success: true, user: deletedUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to delete user, try again later" });
  }
};
