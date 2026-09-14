import TicketModel from "../models/ticket.model.js";

class TicketsRepository {
  async getPaginated(filters, page, limit, sort) {
  return TicketModel.find(filters)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("flights.flight")   // ⭐ ESTA LÍNEA ES LA CLAVE
    .lean();
}

  async create(data) {
    return TicketModel.create(data);
  }

  async update(id, data) {
    return TicketModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id) {
    return TicketModel.findByIdAndDelete(id).lean();
  }
}

export default new TicketsRepository();