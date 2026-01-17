        // import express from "express";
        // import dotenv from "dotenv";
        // import bodyParser from "body-parser";
        // import cors from "cors";

        // import connectDB from "./src/db/connectDB.js";
        // import userRoutes from "./src/routes/userRoutes.js";
        // import companyRoutes from "./src/routes/companyRoutes.js";
        // import jobRoutes from "./src/routes/jobRoutes.js";
        // import contactRoutes from "./src/routes/contactRoutes.js";
        // import recruiterRoutes from "./src/routes/recruiterRoutes.js";
        // //import Candidat from "./models/Candidat.js";
        // // import Cloudinary from "./src/utils/cloudinary.js";

        // // Charger les variables d'environnement
        // dotenv.config();

        // const app = express();
        // app.use(cors({
        //      origin: "http://localhost:5173", // Vite
        //      credentials: true,
        //   }));

        // app.use(express.json());
        // app.use(express.urlencoded({ extended: true }));

        // // Middlewares
        // app.use(bodyParser.json());
        // app.use(cors());
        // app.use("/user", userRoutes);
        // app.use("/contact", contactRoutes);
        // app.use("/recruiter", recruiterRoutes);
        


        // // Connexion à MongoDB
        // connectDB();

        // // // Initialisation Cloudinary (si besoin)
        // // Cloudinary();

        // // Route test
        // app.get("/", (req, res) => {
        // res.send("API is working 🚀");
        // });

        // // Routes principales
        // app.use("/user", userRoutes);
        // app.use("/company", companyRoutes);
        // app.use("/job", jobRoutes);

        // // Dossier statique pour les uploads
        // app.use("/uploads", express.static("uploads"));

        // // Démarrer le serveur
        // const PORT = process.env.PORT || 5000;
        // app.listen(PORT, () =>
        // console.log(`🌐 Server is running on port ${PORT}`)
        // );


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/db/connectDB.js";
import userRoutes from "./src/routes/userRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import recruiterRoutes from "./src/routes/recruiterRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";


dotenv.config();

const app = express();

/* ✅ CORS – UNE SEULE FOIS */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// /* ✅ Préflight */
// app.options("/*", cors());


/* ✅ Parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

/* ✅ Routes */
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
app.use("/contact", contactRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/notification", notificationRoutes);

/* ✅ Static uploads */
app.use("/uploads", express.static("uploads"));

/* ✅ Test */
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

/* ✅ DB */
connectDB();

/* ✅ Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
