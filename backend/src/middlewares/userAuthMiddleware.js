import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Company from "../models/Company.js";

// type: "user" | "company"
const authMiddleware = (type = "user") => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // 🔒 1. Vérification du header
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Vous devez être connecté",
        });
      }

      // 🔑 2. Extraction du token
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token manquant",
        });
      }

      // 🔐 3. Vérification du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 👤 4. Chargement utilisateur ou entreprise
      if (type === "user") {
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Utilisateur introuvable",
          });
        }

        req.user = user; 
        req.userData = user;// ✅ standard
      }

      if (type === "company") {
        const company = await Company.findById(decoded.id).select("-password");

        if (!company) {
          return res.status(401).json({
            success: false,
            message: "Entreprise introuvable",
          });
        }

        req.company = company; // ✅ standard
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);

      return res.status(401).json({
        success: false,
        message: "Session expirée, veuillez vous reconnecter",
      });
    }
  };
};

export default authMiddleware;
