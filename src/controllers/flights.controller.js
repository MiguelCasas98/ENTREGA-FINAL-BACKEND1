import FlightsService from "../flights/flights.service.js";

export const renderFlights = async (req, res) => {
  try {
    const result = await FlightsService.getPaginated({
      filters: {},
      page: 1,
      limit: 50,
      sort: { price: 1 }
    });

    console.log("RESULT DOCS:", result.docs);

    const flights = result.docs.map(f => f.toObject());

    return res.render("flights", { flights });
  } catch (error) {
    console.error("Error al renderizar vuelos:", error);
    return res.status(500).send("Error al cargar la vista de vuelos");
  }
};

export const getFlights = async (req, res) => {
  try {
    const {
      category,
      available,
      page = 1,
      limit = 10,
      sortBy = "price",
      order = "asc",
    } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (available !== undefined) {
      filters.available = available === "true";
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const result = await FlightsService.getPaginated({
      filters,
      page: Number(page),
      limit: Number(limit),
      sort,
    });

    return res.json(result);
  } catch (error) {
    console.error("Error al obtener vuelos:", error);
    return res.status(500).json({ error: "Error al obtener vuelos" });
  }
};

export const createFlight = async (req, res) => {
  try {
    const data = req.body;
    const flight = await FlightsService.create(data);
    return res.status(201).json(flight);
  } catch (error) {
    console.error("Error al crear vuelo:", error);
    return res.status(500).json({ error: "Error al crear vuelo" });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const { fid } = req.params;
    const data = req.body;

    const updated = await FlightsService.update(fid, data);

    if (!updated) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }

    return res.json(updated);
  } catch (error) {
    console.error("Error al actualizar vuelo:", error);
    return res.status(500).json({ error: "Error al actualizar vuelo" });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const { fid } = req.params;

    const deleted = await FlightsService.delete(fid);

    if (!deleted) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }

    return res.json({ message: "Vuelo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar vuelo:", error);
    return res.status(500).json({ error: "Error al eliminar vuelo" });
  }
};