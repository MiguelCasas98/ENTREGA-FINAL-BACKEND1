import { Router } from "express";
import { renderFlights } from "../controllers/flights.controller.js";
import { renderTickets } from "../controllers/tickets.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/flights", renderFlights);

router.get("/availability", renderTickets);

export default router;