// import Notification from "../models/Notification.js";

// export const getUserNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       receiver: req.userData._id,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import Notification from "../models/Notification.js";

/**
 * 📥 Notifications du candidat
 */
export const getCandidateNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      candidateId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 👁️ Marquer comme lu
 */
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
