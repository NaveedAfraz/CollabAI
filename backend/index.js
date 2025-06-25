import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
    