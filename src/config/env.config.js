import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = "mongodb+srv://preentrega:Falumiga98@ecommerce-cluster.k6c24ww.mongodb.net/serviceManager?retryWrites=true&w=majority";

console.log(">>> ENV CONFIG CARGADO DESDE:", import.meta.url);
console.log(">>> MONGO_URI ES:", MONGO_URI);