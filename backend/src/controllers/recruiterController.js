import CandidateProfile from "../models/CandidateProfile.js";
import Notification from "../models/Notification.js";

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidateProfile.find()
      .populate("userId", "name email resume");

    res.json({ success: true, candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const selectCandidate = async (req, res) => {
  try {
    const { candidateUserId, message } = req.body;

    const notification = new Notification({
      sender: req.user._id,
      receiver: candidateUserId,
      message,
    });

    await notification.save();

    res.json({
      success: true,
      message: "Candidat sélectionné et notifié",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const sendMessageToCandidate = async (req, res) => {
  try {
    const { candidateId, message } = req.body;

    const notification = new Notification({
      candidateId,
      recruiterId: req.company._id,
      message,
    });

    await notification.save();

    res.json({
      success: true,
      message: "Message envoyé au candidat",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// import CandidateProfile from "../models/CandidateProfile.js";
// import Notification from "../models/Notification.js";

// /**
//  * 📄 Voir tous les CV des candidats
//  */
// export const getAllCandidates = async (req, res) => {
//   try {
//     const candidates = await CandidateProfile
//       .find()
//       .populate("userId", "name email");

//     res.json({ success: true, candidates });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * ✉️ Envoyer message à un candidat
//  */
// export const sendMessageToCandidate = async (req, res) => {
//   try {
//     const { candidateId, message } = req.body;

//     const notification = new Notification({
//       candidateId,
//       recruiterId: req.company._id,
//       message,
//     });

//     await notification.save();

//     res.json({
//       success: true,
//       message: "Message envoyé au candidat",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

