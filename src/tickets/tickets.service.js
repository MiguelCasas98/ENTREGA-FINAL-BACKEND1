import TicketsRepository from "./tickets.repository.js";

class TicketsService {
  async getPaginated({ filters, page, limit, sort }) {
    return TicketsRepository.getPaginated(filters, page, limit, sort);
  }

  async create(data) {
    return TicketsRepository.create(data);
  }

  async update(id, data) {
    return TicketsRepository.update(id, data);
  }

  async delete(id) {
    return TicketsRepository.delete(id);
  }
}

export default new TicketsService();