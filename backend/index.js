import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./db.js";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import cookieParser from "cookie-parser";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onSignUp } from "./inngest/functions/signUp.js";
import { onTicketCreate } from "./inngest/functions/ticket-create.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://collab-ai-seven.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
connectDB();
app.use("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onSignUp, onTicketCreate],
  })
);
app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
