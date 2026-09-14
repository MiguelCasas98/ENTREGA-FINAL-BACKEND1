import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  code: { type: String, required: true, alias: "Cód." },
  airline: { type: String, required: true, alias: "Aerolí." },
  origin: { type: String, required: true, alias: "Origen" },
  destination: { type: String, required: true, alias: "Destino" },
  date: { type: String, required: true, alias: "Fech." },
  time: { type: String, required: true, alias: "Tie." },
  price: { type: Number, required: true, alias: "Prec." },
  available: { type: Boolean, required: true, alias: "Disponib." }
});

export default mongoose.model("Flight", flightSchema);