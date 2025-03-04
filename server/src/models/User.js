import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, minLength: 6, required: true },
  first_name: { type: String, minLength: 2, required: true },
  last_name: { type: String, minLength: 3, required: false },
  post_code: { type: String, minLength: 6, maxLength: 6, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  products: {
    type: Array,
    required: false,
    additionalItems: true,
    items: { type: String },
  },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["email", "password", "first_name", "post_code"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.email == null) {
    errorList.push("E-mail is a required field");
  }

  if (userObject.password == null) {
    errorList.push("Password is a required field");
  }

  if (userObject.first_name == null) {
    errorList.push("First name is a required field");
  }

  if (userObject.post_code == null) {
    errorList.push("Post code is a required field");
  }

  return errorList;
};

export default User;
