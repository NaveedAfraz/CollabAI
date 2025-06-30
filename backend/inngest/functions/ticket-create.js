import Ticket from "../../models/ticketing.js";
import analyzeTicket from "../../utils/ai.js";
import { inngest } from "../client.js";
import { NonRetriableError } from "inngest";
import User from "../../models/users.js";
export const onTicketCreate = inngest.createFunction(
  { id: "ticket/create", retries: 2 },
  { event: "ticket/create" },
  async ({ event, step }) => {
    console.log("Event received:", event);
    try {
      const { ticketData } = event.data;
      console.log(ticketData, "ticket data");
      const ticket = await step.run("getTicket", async () => {
        const ticket = await Ticket.findById(ticketData._id);
        if (!ticket) {
          throw new NonRetriableError(
            "Ticket no longer exists in our database"
          );
        }
        return ticket;
      });

      await step.run("updateTicket", async () => {
        await Ticket.findByIdAndUpdate(ticketData._id, {
          status: "TODO",
        });
      });

      const aiResult = await analyzeTicket(ticket);
      console.log(aiResult);

      const relatedSkills = await step.run("ai-processing", async () => {
        // Perform AI processing on the ticket
        let skills = [];
        if (aiResult) {
          await Ticket.findByIdAndUpdate(ticketData._id, {
            priority: !["high", "medium", "low"].includes(aiResult.priority)
              ? "medium"
              : aiResult.priority,
            helpfulNotes: aiResult.helpfulNotes,
            status: "IN_PROGRESS",
            relatedSkills: aiResult.relatedSkills,
          });
          skills = aiResult.relatedSkills;
        }
        return skills;
      });

      //moderator is a user too
      const moderator = await step.run("assignModerator", async () => {
        // Assign a moderator to the ticket
        let user = await User.findOne({
          role: "moderator",
          skills: {
            $elemMatch: { $regex: relatedSkills.join("|"), $options: "i" },
          },
        });

        if (!user) {
          user = await User.findOne({ role: "admin" });
        }
        await Ticket.findByIdAndUpdate(ticketData._id, {
          assignedTo: user._id || null,
        });
        return user;
      });

      //optional
      await step.run("sendNotification", async () => {
        if (moderator) {
          const FinalTicket = await Ticket.findById(ticketData._id);
          await step.sendEmail({
            to: moderator.email,
            subject: "New ticket assigned",
            message: `You have been assigned a new ticket: ${FinalTicket.title}`,
          });
        }
      });

      return { success: true };
    } catch (error) {
      console.error("Error in onTicketCreate function: " + error);
      return { success: false };
    }
  }
);
