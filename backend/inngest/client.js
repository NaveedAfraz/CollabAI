import { Inngest } from "inngest";
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.INNGEST_EVENT_KEY, "event key");
// Initialize Inngest with your event key from environment variables
const inngestClient = new Inngest({
  id: "ticking-system",
  eventKey: process.env.INNGEST_EVENT_KEY || "your-inngest-event-key-here"
});

export default inngestClient;
