import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./db.js";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import cookieParser from "cookie-parser";
import { serve } from "inngest/express";
import inngestClient from "./inngest/client.js";
import { onSignUp } from "./inngest/functions/signUp.js";
import { onTicketCreate } from "./inngest/functions/ticket-create.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());  
connectDB();
app.use(
  "api/inngest",
  serve({
    client: inngestClient,
    functions: [onSignUp, onTicketCreate],
  })
);
app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
