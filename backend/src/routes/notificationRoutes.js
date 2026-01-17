// import express from "express";
// import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";
// import { getUserNotifications } from "../controllers/notificationController.js";

// const router = express.Router();

// router.get("/user", userAuthMiddleware, getUserNotifications);

// export default router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getCandidateNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/candidate", authMiddleware("user"), getCandidateNotifications);
router.put("/:id/read", authMiddleware("user"), markAsRead);

export default router;
