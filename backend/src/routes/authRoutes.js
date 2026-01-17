import express from "express";
import {
  githubAuth,
  githubCallback,
} from "../controllers/authController.js";

const router = express.Router();

// Redirection vers GitHub
router.get("/github", githubAuth);

// Callback GitHub
router.get("/github/callback", githubCallback);

export default router;
