import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    clientName: { 
      type: String, 
      required: true 
    },

    clientEmail: { 
      type: String, 
      required: true 
    },

    date: { 
      type: String, 
      required: true 
    },

    time: { 
      type: String, 
      required: true 
    },

    status: { 
      type: String, 
      required: true 
    },

    flights: [
      {
        flight: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Flight",
          required: true
        },
        quantity: { 
          type: Number, 
          required: true, 
          default: 1 
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Ticket", ticketSchema, "tickets");