import FlightsService from "../flights/flights.service.js";
import TicketsService from "../flights/tickets.service.js";

class ViewsController {
  static async renderFlights(req, res) {
    try {
      const flights = await FlightsService.getAll();
      res.render("flights", { flights });
    } catch (error) {
      console.error("Error renderizando vuelos:", error);
      res.status(500).send("Error al cargar la vista de vuelos");
    }
  }

  static async renderAvailability(req, res) {
    try {
      const tickets = await TicketsService.getAll();
      res.render("flightsAvailability", { tickets });
    } catch (error) {
      console.error("Error renderizando disponibilidad:", error);
      res.status(500).send("Error al cargar la vista de disponibilidad");
    }
  }
}

export default ViewsController;