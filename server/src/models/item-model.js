import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  type: { type: String, required: true, enum: ["Puzzle", "Board Game"] },
  condition: {
    type: String,
    required: true,
    enum: ["New", "Like New", "Used"],
  },
  photo_name: { type: String, required: false, default: "" },
  photo: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/dogm5xki5/image/upload/v1742978122/qfsn7oqaob87rxurw5xq.jpg",
  },
  description: { type: String, required: false, maxLength: 300 },
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
    "_id",
    "title",
    "price",
    "type",
    "condition",
    "photo_name",
    "photo",
    "description",
    "created_date",
    "seller_id",
    "status",
    "__v",
  ];

  const validatedKeysMessage = validateAllowedFields(itemObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!itemObject.title) {
    errorList.push("Title is a required field");
  }

  if (!itemObject.price) {
    errorList.push("Price is a required field");
  }

  if (!itemObject.type) {
    errorList.push("Type is a required field");
  }

  if (!itemObject.condition) {
    errorList.push("Condition is a required field");
  }

  if (
    !itemObject.seller_id ||
    !mongoose.isValidObjectId(itemObject.seller_id)
  ) {
    errorList.push("Seller ID is a required field");
  }

  if (!itemObject.status) {
    errorList.push("Status is a required field");
  }

  return errorList;
};

export default Item;
