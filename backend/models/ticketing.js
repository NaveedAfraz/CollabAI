import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    //enum: ["open", "in progress", "closed"],
    default: "TODO",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  helpfulNotes: {
    type: String,
    default: "",
  },
  relatedSkills: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ticket", ticketSchema);
