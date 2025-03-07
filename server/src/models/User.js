import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  post_code: { type: String, minLength: 6, maxLength: 6, required: false },
  city: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  items: [{ type: String }],
});

userSchema.methods.validateUser = function (userObject) {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "password",
    "post_code",
    "city",
    "created_date",
    "items",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);
  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.name) {
    errorList.push("Name is a required field");
  }

  if (!userObject.email) {
    errorList.push("Email is a required field");
  }

  if (!userObject.password) {
    errorList.push("Password is a required field");
  } else if (userObject.password.length < 8) {
    errorList.push("Password must be at least 8 characters long");
  }

  return errorList;
};

const User = mongoose.model("users", userSchema);

export default User;
