import Flight from "../models/flight.model.js";

class FlightsDAO {
  async getPaginated({ filters, page, limit, sort }) {
    const skip = (page - 1) * limit;

    const docs = await Flight.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Flight.countDocuments(filters);

    return {
      docs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(total / limit)
    };
  }

  async getAll() {
    return await Flight.find();
  }

  async getById(id) {
    return await Flight.findById(id);
  }

  async create(data) {
    return await Flight.create(data);
  }

  async update(id, data) {
    return await Flight.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Flight.findByIdAndDelete(id);
  }
}

export default new FlightsDAO();