import Ticket from "../models/ticket.model.js";

class TicketsDAO {
  async getById(id) {
    return await Ticket.findById(id).populate("flights.flight");
  }

  async getAll() {
    return await Ticket.find().populate("flights.flight");
  }

  async getByStatus(status) {
    return await Ticket.find({ status }).populate("flights.flight");
  }

  async getByDate(date) {
    return await Ticket.find({ date }).populate("flights.flight");
  }

  async create(data) {
    return await Ticket.create(data);
  }

  async addFlight(tid, { flight, quantity }) {
    return await Ticket.findByIdAndUpdate(
      tid,
      {
        $push: {
          flights: { flight, quantity }
        }
      },
      { new: true }
    ).populate("flights.flight");
  }

  async updateStatus(tid, status) {
    return await Ticket.findByIdAndUpdate(
      tid,
      { status },
      { new: true }
    ).populate("flights.flight");
  }

  async removeFlight(tid, fid) {
    return await Ticket.findByIdAndUpdate(
      tid,
      {
        $pull: {
          flights: { _id: fid }
        }
      },
      { new: true }
    ).populate("flights.flight");
  }

  async delete(tid) {
    return await Ticket.findByIdAndDelete(tid);
  }
}

export default new TicketsDAO();