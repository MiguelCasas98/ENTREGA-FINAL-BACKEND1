import MessageModel from "../models/message.model.js";

export default class MessagesDAO {
  async getAll() {
    return await MessageModel.find().lean();
  }

  async create(data) {
    return await MessageModel.create(data);
  }

  async delete(id) {
    return await MessageModel.findByIdAndDelete(id);
  }
}