import TicketsDAO from "../dao/tickets.dao.js";

class TicketsRepository {
  async getById(id) {
    return await TicketsDAO.getById(id);
  }

  async getAll() {
    return await TicketsDAO.getAll();
  }

  async getByStatus(status) {
    return await TicketsDAO.getByStatus(status);
  }

  async getByDate(date) {
    return await TicketsDAO.getByDate(date);
  }

  async create(data) {
    return await TicketsDAO.create(data);
  }

  async addFlight(tid, data) {
    return await TicketsDAO.addFlight(tid, data);
  }

  async updateStatus(tid, status) {
    return await TicketsDAO.updateStatus(tid, status);
  }

  async removeFlight(tid, fid) {
    return await TicketsDAO.removeFlight(tid, fid);
  }

  async delete(tid) {
    return await TicketsDAO.delete(tid);
  }
}

export default new TicketsRepository();