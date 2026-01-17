// import mongoose from "mongoose";

// const recruiterSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     image: { type: String },
//     role: { type: String, default: "recruiter" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Recruiter", recruiterSchema);
 
import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  name: String,
  email: String,
});

export default mongoose.model("Recruiter", recruiterSchema);
