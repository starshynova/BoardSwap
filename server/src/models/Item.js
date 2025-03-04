import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ["Puzzle", "Board Game"] },
  condition: {
    type: String,
    required: true,
    enum: ["New", "Like New", "Used"],
  },
  photo: { type: String, required: false },
  description: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  status: { type: String, required: true, enum: ["Available", "Sold"] },
});

const Item = mongoose.model("items", itemSchema);

export const validateItem = (itemObject) => {
  const errorList = [];
  const allowedKeys = [
    "title",
    "price",
    "type",
    "condition",
    "seller_id",
    "status",
  ];

  const validatedKeysMessage = validateAllowedFields(itemObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (itemObject.title == null) {
    errorList.push("Title is a required field");
  }

  if (itemObject.price == undefined) {
    errorList.push("Price is a required field");
  }

  if (itemObject.type == null) {
    errorList.push("Type is a required field");
  }

  if (itemObject.condition == null) {
    errorList.push("Condition is a required field");
  }

  if (
    !itemObject.seller_id ||
    !mongoose.isValidObjectId(itemObject.seller_id)
  ) {
    errorList.push("Seller ID is a required field");
  }

  if (itemObject.status == null) {
    errorList.push("Status is a required field");
  }

  return errorList;
};

export default Item;
