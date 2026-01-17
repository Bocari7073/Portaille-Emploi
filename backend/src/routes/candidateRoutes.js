import express from "express";
import multer from "multer";
import CandidateCV from "../models/CandidateCV.js";

const router = express.Router();

// Configurer multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier où seront stockés les CV
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// photo
router.post(
  "/profil",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  saveCandidatProfil
);

// Upload CV
router.post("/upload-cv", upload.single("cv"), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Fichier manquant" });
    }

    const cv = new CandidateCV({
      userId,
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
    });

    await cv.save();

    res.json({ success: true, message: "CV uploadé avec succès", cv });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { registerUser, loginUser, fetchUserData, uploadResume } from "../controllers/userController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // 🔹 Configuration multer pour stocker fichiers localement
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads")); // dossier uploads à la racine backend
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// // ----------------- ROUTES PUBLIC -----------------
// router.post("/register", upload.single("image"), registerUser);
// router.post("/login", loginUser);

// // ----------------- ROUTES PROTÉGÉES -----------------
// router.get("/data", authMiddleware(), fetchUserData);

// // Upload profil et CV
// router.post(
//   "/profil",
//   authMiddleware("candidat"), 
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//   ]),
//   uploadResume
// );

// export default router;
