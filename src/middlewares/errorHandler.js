// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Datos inválidos",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "ID inválido",
      details: [`El valor '${err.value}' no es un ObjectId válido.`],
    });
  }

  return res.status(500).json({
    error: "Error interno del servidor",
    details: [err.message || "Ocurrió un error inesperado"],
  });
};