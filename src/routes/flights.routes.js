import { Router } from "express";
import * as FlightsController from "../controllers/flights.controller.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createFlightSchema,
  updateFlightSchema
} from "../validations/flights.validation.js";

const router = Router();

router.get("/", FlightsController.getFlights);

router.post(
  "/",
  validateSchema(createFlightSchema),
  FlightsController.createFlight
);

router.put(
  "/:fid",
  validateSchema(updateFlightSchema),
  FlightsController.updateFlight
);

router.delete("/:fid", FlightsController.deleteFlight);

export default router;