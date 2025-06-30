// import { Inngest } from "inngest";
// import dotenv from "dotenv";
// dotenv.config();
// //console.log(process.env.INNGEST_EVENT_KEY, "event key");
// // Initialize Inngest with your event key from environment variables
// const inngestClient = new Inngest({
//   id: "ticking-system",
//   eventKey: process.env.INNGEST_EVENT_KEY,
// });

// export default inngestClient;

import { Inngest } from "inngest";
import dotenv from "dotenv";
dotenv.config();
export const inngest = new Inngest({
  id: "ticketing-system",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
