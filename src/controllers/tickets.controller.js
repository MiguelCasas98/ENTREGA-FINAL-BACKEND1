import TicketsService from "../tickets/tickets.service.js";

export const renderTickets = async (req, res) => {
  try {
    const tickets = await TicketsService.getPaginated({
      filters: {},
      page: 1,
      limit: 50,
      sort: { date: 1 }
    });

    console.log("📌 TICKETS ENVIADOS A LA VISTA:");
    console.log(JSON.stringify(tickets, null, 2));

    return res.render("availability", { tickets });
  } catch (error) {
    console.error("Error al renderizar tickets:", error);
    return res.status(500).send("Error al cargar la vista de tickets");
  }
};

export const getTickets = async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 10,
      sortBy = "date",
      order = "asc",
    } = req.query;

    const filters = {};
    if (status) filters.status = status;

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const tickets = await TicketsService.getPaginated({
      filters,
      page: Number(page),
      limit: Number(limit),
      sort,
    });

    return res.json(tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    return res.status(500).json({ error: "Error al obtener tickets" });
  }
};

export const createTicket = async (req, res) => {
  try {
    const data = req.body;
    const ticket = await TicketsService.create(data);
    return res.status(201).json(ticket);
  } catch (error) {
    console.error("Error al crear ticket:", error);
    return res.status(500).json({ error: "Error al crear ticket" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { tid } = req.params;
    const data = req.body;

    const updated = await TicketsService.update(tid, data);

    if (!updated) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    return res.json(updated);
  } catch (error) {
    console.error("Error al actualizar ticket:", error);
    return res.status(500).json({ error: "Error al actualizar ticket" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { tid } = req.params;

    const deleted = await TicketsService.delete(tid);

    if (!deleted) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    return res.json({ message: "Vuelo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ticket:", error);
    return res.status(500).json({ error: "Error al eliminar ticket" });
  }
};