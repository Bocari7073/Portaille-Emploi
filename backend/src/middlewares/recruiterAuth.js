import jwt from "jsonwebtoken";
import User from "../models/User.js";

const recruiterAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token manquant" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "recruiter") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export default recruiterAuth;
