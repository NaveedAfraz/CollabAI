import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./db.js";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/ticket", ticketRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
