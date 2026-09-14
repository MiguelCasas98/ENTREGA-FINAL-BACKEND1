import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a Atlas");
  } catch (error) {
    console.error("Error conectando a Atlas:", error);
    process.exit(1);
  }
};