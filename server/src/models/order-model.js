import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const orderSchema = new mongoose.Schema(
  {
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "items",
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
        condition: { type: String, required: true },
        description: { type: String },
        photo: { type: String },
        seller_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        status: { type: String, required: true },
        created_date: { type: Date, required: true },
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

const Order = mongoose.model("orders", orderSchema);

export const validateOrder = (orderObject) => {
  const errorList = [];
  const allowedKeys = [
    "buyer_id",
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
  } else {
    orderObject.items.forEach((item, index) => {
      if (!item._id || !mongoose.isValidObjectId(item._id)) {
        errorList.push(
          `Item ${index + 1}: _id is a required field and must be a valid ObjectId`,
        );
      }
      if (!item.title) {
        errorList.push(`Item ${index + 1}: Title is a required field`);
      }
      if (!item.price || typeof item.price !== "number") {
        errorList.push(
          `Item ${index + 1}: Price is a required field and must be a number`,
        );
      }
      if (!item.seller_id || !mongoose.isValidObjectId(item.seller_id)) {
        errorList.push(
          `Item ${index + 1}: Seller ID is a required field and must be a valid ObjectId`,
        );
      }
    });
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
