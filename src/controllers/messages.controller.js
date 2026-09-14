import MessagesService from "../flights/messages.service.js";

const service = new MessagesService();

export const getMessages = async (req, res) => {
  const messages = await service.getMessages();
  res.json(messages);
};

export const createMessage = async (req, res) => {
  const newMessage = await service.createMessage(req.body);

  req.io.emit("newMessage", newMessage);

  res.status(201).json(newMessage);
};

export const deleteMessage = async (req, res) => {
  const { mid } = req.params;
  await service.deleteMessage(mid);
  res.json({ message: "Mensaje eliminado" });
};