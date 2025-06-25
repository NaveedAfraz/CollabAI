import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Please provide MONGO_URL in the environment variables");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
