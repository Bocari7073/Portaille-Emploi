import bcrypt from "bcrypt";
import fs from "fs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import CandidateProfile from "../models/CandidateProfile.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Entrez votre nom" });
    }

    if (!email) {
      return res.json({ success: false, message: "Entrez votre mail" });
    }

    if (!password) {
      return res.json({ success: false, message: "Entrez votre mot de passe" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Téléchargez votre logo" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "L'utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    

    // const imageUploadUrl = await cloudinary.uploader.upload(imageFile.path);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: imageFile.path, // <-- chemin local du fichier
    });

    await user.save();

    const token = await generateToken(user._id);

    return res.json({
      success: true,
      message: "Inscription réussie",
      userData: user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "L'inscription a échoué",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "L'e-mail est requis" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Le mot de passe est requis" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Mot de passe invalide" });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Connexion réussie",
      userData: user,
      token,
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return res.status(500).json({ success: false, message: "La connexion a échoué" });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const userData = req.user;

    return res.status(200).json({
      success: true,
      message: "Données utilisateur récupérées avec succès",
      userData,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Échec de la récupération des données utilisateur",
      userData,
    });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "L'identifiant utilisateur et l'identifiant de poste sont requis.",
      });
    }

    const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });

    if (isAlreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "Vous avez déjà postulé à ce poste",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({ success: false, message: "Emploi introuvable" });
    }

    const jobApplication = new JobApplication({
      jobId,
      userId,
      companyId: jobData.companyId,
      date: new Date(),
    });

    await jobApplication.save();

    return res.status(201).json({
      success: true,
      message: "Emploi postulé avec succès",
      jobApplication,
    });
  } catch (error) {
    console.error("Erreur de candidature à un emploi:", error);

    return res.status(500).json({
      success: false,
      message: "La demande d'emploi a échoué",
    });
  }
};

export const getUserAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const application = await JobApplication.find({ userId })
      .populate("identifiant de l'entreprise", "Nom Email Image")
      .populate("ID de travail", "Titre Lieu date Statut");

    return res.status(200).json({
      success: true,
      message: "Candidature récupérée avec succès",
      jobApplications: application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Impossible de récupérer la candidature.",
    });
  }
};


// Récupérer l'image de l'utilisateur
export const getUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || !user.image) {
      return res.status(404).json({ success: false, message: "Image introuvable" });
    }

    res.contentType(user.image.contentType);
    res.send(user.image.data);
  } catch (error) {
    console.error("Obtenir une erreur d'image utilisateur:", error);
    res.status(500).json({ success: false, message: "Impossible de récupérer l'image" });
  }
};

// Récupérer le CV de l'utilisateur
export const getUserResume = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || !user.resume) {
      return res.status(404).json({ success: false, message: "CV introuvable" });
    }

    res.contentType(user.resume.contentType);
    res.send(user.resume.data);
  } catch (error) {
    console.error("Erreur d'obtention du CV de l'utilisateur:", error);
    res.status(500).json({ success: false, message: "Impossible de récupérer le CV" });
  }
};
// export const uploadResume = async (req, res) => {
//   try {
//     const { profile, formation, experience } = req.body;

//     if (!req.files || !req.files.resume) {
//       return res.status(400).json({ message: "CV requis" });
//     }

//     const profileData = {
//       userId: req.user._id,  // <-- IMPORTANT
//       profile: JSON.parse(profile),
//       formation: JSON.parse(formation),
//       experience: JSON.parse(experience),
//       cv: {
//         filename: req.files.resume[0].filename,
//         path: req.files.resume[0].path,
//       },
//     };

//     // Ajouter la photo si elle existe
//     if (req.files.image && req.files.image[0]) {
//       profileData.image = {
//         filename: req.files.image[0].filename,
//         path: req.files.image[0].path,
//       };
//     }

//     // Vérifier si le profil existe déjà
//     const existingProfile = await CandidateProfile.findOne({ userId: req.user._id });

//     if (existingProfile) {
//       await CandidateProfile.findOneAndUpdate({ userId: req.user._id }, profileData, { new: true });
//       return res.json({ success: true, message: "Profil candidat mis à jour avec succès" });
//     }

//     // Sinon, créer un nouveau profil
//     const newProfile = new CandidateProfile(profileData);
//     await newProfile.save();

//     return res.json({ success: true, message: "Profil candidat créé avec succès" });
//   } catch (error) {
//     console.error("Erreur upload profil :", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const uploadResume = async (req, res) => {
  try {
    const { profile, formation, experience } = req.body;

    // Vérification des fichiers
    const resumeFile = req.files?.resume?.[0];
    const imageFile = req.files?.image?.[0];

    const profileData = {
      userId: req.user._id, // ✅ ici on utilise req.user._id
      profile: JSON.parse(profile),
      formation: JSON.parse(formation),
      experience: JSON.parse(experience),
      cv: resumeFile ? { filename: resumeFile.filename, path: resumeFile.path } : undefined,
      image: imageFile ? { filename: imageFile.filename, path: imageFile.path } : undefined,
    };

    // Mise à jour ou création
    const existingProfile = await CandidateProfile.findOne({ userId: req.user._id });
    if (existingProfile) {
      await CandidateProfile.findOneAndUpdate({ userId: req.user._id }, profileData, { new: true });
      return res.json({ success: true, message: "Profil candidat mis à jour avec succès" });
    }

    const newProfile = new CandidateProfile(profileData);
    await newProfile.save();
    res.json({ success: true, message: "Profil candidat créé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
