import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nom, email, message } = req.body;

    if (!nom || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    const newContact = new Contact({ nom, email, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message enregistré avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
});

export default router;
