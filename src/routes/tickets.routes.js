import { Router } from "express";

import {
  renderTickets,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "../controllers/tickets.controller.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { createTicketSchema } from "../validations/tickets.validation.js";

const router = Router();

router.get("/view", renderTickets);

router.get("/", getTickets);

router.post("/", validateSchema(createTicketSchema), createTicket);

router.put("/:tid", updateTicket);

router.delete("/:tid", deleteTicket);

export default router;