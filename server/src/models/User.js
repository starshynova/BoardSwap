import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  post_code: { type: String, minLength: 6, maxLength: 6, required: false },
  city: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  products: [{ type: String }],
});

userSchema.methods.validateUser = function (userObject) {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "confirm_email",
    "password",
    "confirm_password",
    "post_code",
    "city",
    "created_date",
    "products",
  ];

  const invalidFields = Object.keys(userObject).filter(
    (key) => !allowedKeys.includes(key),
  );

  if (invalidFields.length > 0) {
    errorList.push(
      `The following properties are not allowed: ${invalidFields.join(", ")}`,
    );
  }

  if (!userObject.name) {
    errorList.push("Name is a required field");
  }

  if (!userObject.email) {
    errorList.push("Email is a required field");
  }

  if (!userObject.confirm_email) {
    errorList.push("Confirm Email is a required field");
  } else if (userObject.email !== userObject.confirm_email) {
    errorList.push("Email and Confirm Email must match");
  }

  if (!userObject.password) {
    errorList.push("Password is a required field");
  } else if (userObject.password.length < 8) {
    errorList.push("Password must be at least 8 characters long");
  }

  if (!userObject.confirm_password) {
    errorList.push("Confirm Password is a required field");
  } else if (userObject.password !== userObject.confirm_password) {
    errorList.push("Password and Confirm Password must match");
  }

  return errorList;
};

const User = mongoose.model("users", userSchema);

export default User;
