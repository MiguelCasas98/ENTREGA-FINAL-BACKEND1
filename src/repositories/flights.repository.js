import FlightsDAO from "../dao/flights.dao.js";

class FlightsRepository {
  async getPaginated({ filters, page, limit, sort }) {
    return await FlightsDAO.getPaginated({ filters, page, limit, sort });
  }

  async getAll() {
    return await FlightsDAO.getAll();
  }

  async getById(id) {
    return await FlightsDAO.getById(id);
  }

  async create(data) {
    return await FlightsDAO.create(data);
  }

  async update(id, data) {
    return await FlightsDAO.update(id, data);
  }

  async delete(id) {
    return await FlightsDAO.delete(id);
  }
}

export default new FlightsRepository();