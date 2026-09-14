import { z } from "zod";

export const createTicketSchema = z.object({
  clientName: z.string().min(3, "El nombre del cliente debe tener al menos 3 caracteres"),
  clientEmail: z.string().email("El email del cliente no es válido"),
  date: z.string().min(4, "La fecha debe tener formato válido"),
  time: z.string().min(4, "La hora debe tener formato válido"),
  status: z.enum(["pendiente", "confirmado", "cancelado"], {
    errorMap: () => ({ message: "Estado inválido" })
  }),
  flights: z.array(
    z.object({
      flight: z.string().min(1, "El ID del vuelo es obligatorio"),
      quantity: z.number().int().positive("La cantidad debe ser un número positivo")
    })
  ).min(1, "Debe incluir al menos un vuelo")
});

export const addFlightToTicketSchema = z.object({
  flight: z.string().min(1, "El ID del vuelo es obligatorio"),
  quantity: z.number().int().positive("La cantidad debe ser un número positivo")
});