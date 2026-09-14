import { z } from "zod";

export const createFlightSchema = z.object({
  code: z.string().min(2, "El código debe tener al menos 2 caracteres"),
  origin: z.string().min(3, "El origen debe tener al menos 3 caracteres"),
  destination: z.string().min(3, "El destino debe tener al menos 3 caracteres"),
  date: z.string().min(4, "La fecha es obligatoria"),
  time: z.string().min(4, "La hora es obligatoria"),
  airline: z.string().min(2, "La aerolínea debe tener al menos 2 caracteres"),
  price: z.number().positive("El precio debe ser un número positivo"),
  available: z.boolean().optional()
});

export const updateFlightSchema = createFlightSchema.partial();