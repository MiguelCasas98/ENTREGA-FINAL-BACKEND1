import FlightsRepository from "../repositories/flights.repository.js";

class FlightsService {
  async getPaginated(filters) {
    return await FlightsRepository.getPaginated(filters);
  }

  async getAll() {
    return await FlightsRepository.getAll();
  }

  async create(data) {
    return await FlightsRepository.create(data);
  }

  async update(id, data) {
    return await FlightsRepository.update(id, data);
  }

  async delete(id) {
    return await FlightsRepository.delete(id);
  }
}

export default new FlightsService();