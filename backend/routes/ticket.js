import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authenticate.js";
import { createTicket, getTicket, getTickets } from "../controllers/ticket.js";
import { getAuthenticatedUser } from "../controllers/user.js";

router.get("/getTickets", getTickets);
router.get("/getTicket/:ticketId", getTicket);
router.post("/createTicket", authenticate, createTicket);
router.get("/getAuthenticatedUser", authenticate, getAuthenticatedUser);
export default router;
