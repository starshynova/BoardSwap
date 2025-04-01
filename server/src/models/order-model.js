import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
        required: true,
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export const validateOrder = (orderObject) => {
  const errorList = [];
  const allowedKeys = [
    "user_id",
    "items",
    "total_price",
    "address",
    "city",
    "email",
    "firstName",
    "lastName",
    "postcode",
  ];

  const validatedKeysMessage = validateAllowedFields(orderObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!orderObject.user_id || !mongoose.isValidObjectId(orderObject.user_id)) {
    errorList.push("User ID is a required field and must be a valid ObjectId");
  }

  if (!Array.isArray(orderObject.items) || orderObject.items.length === 0) {
    errorList.push("Items must be a non-empty array");
  }

  if (!orderObject.total_price || typeof orderObject.total_price !== "number") {
    errorList.push("Total price is a required field and must be a number");
  }

  if (!orderObject.address) {
    errorList.push("Address is a required field");
  }

  if (!orderObject.city) {
    errorList.push("City is a required field");
  }

  if (
    !orderObject.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderObject.email)
  ) {
    errorList.push("Email is a required field and must be valid");
  }

  if (!orderObject.firstName) {
    errorList.push("First name is a required field");
  }

  if (!orderObject.lastName) {
    errorList.push("Last name is a required field");
  }

  if (!orderObject.postcode) {
    errorList.push("Postcode is a required field");
  }

  return errorList;
};

export default Order;
