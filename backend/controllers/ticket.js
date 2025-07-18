import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticketing.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);
    console.log(process.env.INNGEST_EVENT_KEY, "event key");
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
        success: false,
      });
    }
    console.log(req.user);
    const ticket = Ticket.create({
      title,
      description,
      createdBy: req.user._id,
    });

    await inngest.send({
      name: "ticket/create",
      data: {
        ticketData: {
          _id: (await ticket)._id,
          description,
          createdBy: req.user._id,
        },
      },
    });
    return res
      .status(201)
      .json({ message: "Ticket created successfully", success: true, ticket });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];
    if (user?.role !== "user") {
      tickets = await Ticket.find()
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select(
          "title description status priority helpfulNotes relatedSkills createdAt"
        )
        .sort({ createdAt: -1 });
    }
    return res.status(200).json({ tickets, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    // if (!user) {
    //   return res.status(401).json({ message: "Unauthorized", success: false });
    // }
    let ticket;
    if (user?.role !== "user") {
      ticket = await Ticket.findById(req.params.ticketId)
        .populate("assignedTo", ["email", "_id"])
        .populate("createdBy", ["email", "_id"]);
    } else {
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: req.params.ticketId,
      })
        .populate("assignedTo", ["email", "_id"])
        .populate("createdBy", ["email", "_id"])
        .select(
          "title description status priority helpfulNotes relatedSkills createdAt"
        );
    }

    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket not found", success: false });
    }
    return res.status(200).json({ ticket, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
