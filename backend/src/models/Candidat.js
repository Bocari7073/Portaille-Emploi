// import mongoose from "mongoose";

// const formationSchema = new mongoose.Schema({
//   titre: String,
//   etablissement: String,
//   dateDebut: String,
//   dateFin: String,
//   description: String,
// });

// const experienceSchema = new mongoose.Schema({
//   poste: String,
//   entreprise: String,
//   dateDebut: String,
//   dateFin: String,
//   description: String,
// });

// const candidatSchema = new mongoose.Schema({
//   nom: { type: String, required: true },
//   prenom: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   telephone: String,
//   dateNaissance: String,
//   lieuNaissance: String,
//   sexe: String,
//   nationalite: String,
//   adresse: String,
//   photo: String, // chemin du fichier
//   cv: String,    // chemin du fichier
//   formations: [formationSchema],
//   experiences: [experienceSchema],
// }, { timestamps: true });

// export default mongoose.model("Candidat", candidatSchema);

import mongoose from "mongoose";

const FormationSchema = new mongoose.Schema({
  debut: String,
  fin: String,
  titre: String,
  etablissement: String,
  description: String,
});

const ExperienceSchema = new mongoose.Schema({
  debut: String,
  fin: String,
  poste: String,
  entreprise: String,
  description: String,
});

const CandidatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profile: {
      nom: String,
      prenom: String,
      email: String,
      telephone: String,
      naissance: String,
      lieuNaissance: String,
      sexe: String,
      nationalite: String,
      adresse: String,
    },

    formation: [FormationSchema],
    experience: [ExperienceSchema],

    resume: String, // chemin du CV
    image: String,  // chemin photo profil
  },
  { timestamps: true }
);

export default mongoose.model("Candidat", CandidatSchema);
