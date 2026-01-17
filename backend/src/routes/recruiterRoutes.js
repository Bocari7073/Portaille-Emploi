// import express from "express";
// import CandidateProfile from "../models/CandidateProfile.js";
// import recruiterAuth from "../middlewares/recruiterAuth.js";

// const router = express.Router();

// // 🔐 Accès recruteur uniquement
// router.get("/candidates", recruiterAuth, async (req, res) => {
//   try {
//     const candidates = await CandidateProfile
//       .find()
//       .populate("userId", "email role");

//     res.json({
//       success: true,
//       candidates,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;


// import express from "express";
// import recruiterAuth from "../middlewares/recruiterAuth.js";
// import {
//   getAllCandidates,
//   selectCandidate,
// } from "../controllers/recruiterController.js";

// const router = express.Router();

// router.get("/candidates", recruiterAuth, getAllCandidates);
// router.post("/select", recruiterAuth, selectCandidate);

// export default router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Récupérer tous les candidats
router.get("/candidates", authMiddleware("recruteur"), async (req, res) => {
  try {
    const candidates = await User.find({ role: "candidat" }).select("-password");
    res.json({ success: true, candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;



