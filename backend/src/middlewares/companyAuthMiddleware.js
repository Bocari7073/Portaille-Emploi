import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const companyAuthMiddleware = async (req, res, next) => {
  try {
    // Récupère le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized, please login again" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decodedToken.id).select("-password");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    req.companyData = company;

    next();
  } catch (error) {
    console.error("Company auth error:", error);
    return res.status(401).json({ message: "Unauthorized, please login again" });
  }
};

export default companyAuthMiddleware;
