import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL;
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables",
      );
    }
    await mongoose.connect(mongoURI);
  } catch (err) {
    process.exit(1);
  }
};

export default connectDB;
