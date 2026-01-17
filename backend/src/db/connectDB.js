import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Charge le .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Base de données connectée avec succès");
  } catch (error) {
    console.log(error);
    console.log("❎ La connexion à la base de données a échoué");
  }
};

export default connectDB;
