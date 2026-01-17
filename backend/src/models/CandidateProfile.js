import mongoose from "mongoose";

const candidateProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // un profil par utilisateur
  },
  profile: {
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    telephone: { type: String },
    naissance: { type: Date },
    lieuNaissance: { type: String },
    sexe: { type: String },
    nationalite: { type: String },
    adresse: { type: String },
  },
  formation: [
    {
      debut: { type: String },
      fin: { type: String },
      titre: { type: String },
      etablissement: { type: String },
      description: { type: String },
    }
  ],
  experience: [
    {
      debut: { type: String },
      fin: { type: String },
      poste: { type: String },
      entreprise: { type: String },
      description: { type: String },
    }
  ],
  cv: {
    filename: { type: String },
    path: { type: String },
  },
  image: {
    filename: { type: String },
    path: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Mettre à jour automatiquement la date de modification
candidateProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);

export default CandidateProfile;
