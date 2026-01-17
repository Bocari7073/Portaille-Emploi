import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  fetchUserData,
  applyJob,
  getUserAppliedJobs,
  uploadResume,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =================== MULTER CONFIG =================== */
const createUpload = (folder = "uploads/") =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}-${file.fieldname}.${ext}`);
      },
    }),
  });

// Upload global par défaut (pour images génériques)
const upload = createUpload();

// Upload spécifique pour CV
const cvUpload = createUpload("uploads/resumes/");

// Upload spécifique pour images
const imageUpload = createUpload("uploads/images/");

/* ================= AUTH ================= */
router.post("/register-user", imageUpload.single("image"), registerUser);
router.post("/login-user", loginUser);
router.get("/user-data", authMiddleware("candidat"), fetchUserData);

/* ================= JOBS ================= */
router.post("/apply-job", authMiddleware("candidat"), applyJob);
router.post("/get-user-applications", authMiddleware("candidat"), getUserAppliedJobs);

/* ================= PROFIL CANDIDAT ================= */
router.post(
  "/candidat/profil",
  authMiddleware(["candidat"]),
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === "resume") cb(null, "uploads/resumes/");
        else if (file.fieldname === "image") cb(null, "uploads/images/");
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}-${file.fieldname}.${ext}`);
      },
    }),
  }).fields([
    { name: "resume", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  uploadResume
);

export default router;
