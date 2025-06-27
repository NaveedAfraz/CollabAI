import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authenticate";
import { createTicket, getTicket, getTickets } from "../controllers/ticket";

router.get("/getTickets", authenticate, getTickets);
router.get("/getTicket/:ticketId", authenticate, getTicket);
router.post("/createTicket", authenticate, createTicket);

export default router;