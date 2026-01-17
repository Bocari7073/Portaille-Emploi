import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // 🔑 Récupération du token depuis Authorization ou token
      let token = req.headers.authorization || req.headers.token;

      if (!token) {
        return res.status(401).json({ message: "Token manquant" });
      }

      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      // 🔐 Vérification et décodage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔹 Récupération de l'utilisateur dans la DB
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }

      // 🔹 DEBUG : afficher token et rôle
      // console.log("TOKEN UTILISATEUR :", token);
      // console.log("ROLE UTILISATEUR DB :", user.role);
      // console.log("ROLES ATTENDUS :", roles);

      // 🚫 Vérification du rôle si roles spécifiés
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Rôle non autorisé" });
      }

      // ✅ Ajout de l'utilisateur à la requête
      req.user = user;

      next();
    } catch (error) {
      console.error("Erreur middleware auth :", error.message);
      return res.status(401).json({ message: "Token invalide" });
    }
  };
};

export default authMiddleware;

// import jwt from "jsonwebtoken";

// const authMiddleware = (role) => {
//   return (req, res, next) => {
//     try {
//       // 🔑 Récupération du token depuis Authorization Bearer ou token header
//       const token = req.headers.authorization?.split(" ")[1] || req.headers.token;

//       if (!token) {
//         return res.status(401).json({ message: "Non autorisé : token manquant" });
//       }

//       // 🔐 Vérification du token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // { id, role }

//       // 🔒 Vérification du rôle
//       if (role && (!decoded.role || decoded.role !== role)) {
//         return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
//       }

//       next();
//     } catch (error) {
//       console.error("Auth Middleware Error:", error);
//       res.status(401).json({ message: "Token invalide ou expiré" });
//     }
//   };
// };

// export default authMiddleware;

