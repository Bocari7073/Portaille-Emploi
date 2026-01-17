// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Recruiter",
//       required: true,
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     message: { type: String, required: true },
//     isRead: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Notification", notificationSchema);

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
