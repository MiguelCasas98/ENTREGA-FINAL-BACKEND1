import MessagesDAO from "../dao/messages.dao.js";

export default class MessagesRepository {
  constructor() {
    this.dao = new MessagesDAO();
  }

  getAll() {
    return this.dao.getAll();
  }

  create(data) {
    return this.dao.create(data);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}