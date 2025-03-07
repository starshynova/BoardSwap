import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const orderSchema = new mongoose.Schema({
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "items",
  },
  item_title: { type: String, required: true, ref: "items" },
  item_photo: { type: String, required: false, ref: "items" },
  date: { type: Date, default: Date.now },
  delivery_address: { type: String, required: true },
  price: { type: Number, required: true, ref: "items" },
});

const Order = mongoose.model("orders", orderSchema);

export const validateOrder = (orderObject) => {
  const errorList = [];
  const allowedKeys = [
    "buyer_id",
    "seller_id",
    "item_id",
    "item_title",
    "delivery_address",
    "price",
  ];

  const validatedKeysMessage = validateAllowedFields(orderObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (
    !orderObject.buyer_id ||
    !mongoose.isValidObjectId(orderObject.buyer_id)
  ) {
    errorList.push("Buyer ID is a required field");
  }

  if (
    !orderObject.seller_id ||
    !mongoose.isValidObjectId(orderObject.seller_id)
  ) {
    errorList.push("Seller ID is a required field");
  }

  if (!orderObject.item_id || !mongoose.isValidObjectId(orderObject.item_id)) {
    errorList.push("Product ID is a required field");
  }

  if (orderObject.item_title == null) {
    errorList.push("Product title is a required field");
  }

  if (orderObject.delivery_address == null) {
    errorList.push("Address for delivery is a required field");
  }

  if (orderObject.price == undefined) {
    errorList.push("Price is a required field");
  }

  return errorList;
};

export default Order;
