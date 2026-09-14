import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { connectDB } from "./config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import flightsRouter from "./routes/flights.routes.js";
import ticketsRouter from "./routes/tickets.routes.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.routes.js";

import { renderTickets } from "./controllers/tickets.controller.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

connectDB();

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/flights", flightsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/messages", messagesRouter);

app.use("/", viewsRouter);

app.get("/availability", renderTickets);

app.use(errorHandler);