import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// POST /api/jobs -> créer une annonce
router.post("/", async (req, res) => {
  try {
    const { title, company, description } = req.body;
    const job = new Job({ title, company, description });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
