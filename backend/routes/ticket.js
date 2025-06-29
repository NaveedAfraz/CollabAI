import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authenticate.js";
import { createTicket, getTicket, getTickets } from "../controllers/ticket.js";

router.get("/getTickets", authenticate, getTickets);
router.get("/getTicket/:ticketId", authenticate, getTicket);
router.post("/createTicket", authenticate, createTicket);

export default router;