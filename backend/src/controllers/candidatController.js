import CandidateProfile from "../models/CandidateProfile.js";
import User from "../models/User.js";

// Upload ou mise à jour du profil candidat
export const uploadResume = async (req, res) => {
  try {
    const { profile, formation, experience } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
    }

    if (!profile || !formation || !experience) {
      return res.status(400).json({ success: false, message: "Données profil manquantes" });
    }

    // Préparer les données
    const profileData = {
      userId: req.user._id,
      profile: JSON.parse(profile),
      formation: JSON.parse(formation),
      experience: JSON.parse(experience),
    };

    // Gestion du CV
    if (req.file && req.file.fieldname === "cv") {
      profileData.cv = {
        filename: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
      };
    }

    // Gestion de la photo
    if (req.file && req.file.fieldname === "image") {
      profileData.image = {
        filename: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
      };

      // Mettre à jour l'image dans la collection User
      await User.findByIdAndUpdate(req.user._id, { image: req.file.path });
    }

    // Vérifier si le profil existe déjà
    const existingProfile = await CandidateProfile.findOne({ userId: req.user._id });

    if (existingProfile) {
      const updated = await CandidateProfile.findOneAndUpdate(
        { userId: req.user._id },
        profileData,
        { new: true }
      );
      return res.json({ success: true, message: "Profil candidat mis à jour avec succès", data: updated });
    }

    // Sinon créer un nouveau profil
    const newProfile = new CandidateProfile(profileData);
    await newProfile.save();

    return res.json({ success: true, message: "Profil candidat créé avec succès", data: newProfile });

  } catch (error) {
    console.error("Erreur upload profil candidat :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
