import MessagesRepository from "../repositories/messages.repository.js";

export default class MessagesService {
  constructor() {
    this.repository = new MessagesRepository();
  }

  getMessages() {
    return this.repository.getAll();
  }

  createMessage(data) {
    return this.repository.create(data);
  }

  deleteMessage(id) {
    return this.repository.delete(id);
  }
}