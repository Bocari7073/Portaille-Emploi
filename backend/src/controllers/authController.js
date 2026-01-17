// import bcrypt from "bcrypt";
// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const imageFile = req.file;

//     if (!name || !email || !password || !imageFile)
//       return res.json({ success: false, message: "Tous les champs sont requis" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.json({ success: false, message: "L'utilisateur existe déjà" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       image: imageFile.path,
//     });

//     await user.save();
//     const token = generateToken(user._id);

//     res.json({ success: true, message: "Inscription réussie", userData: user, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Erreur lors de l'inscription" });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ success: false, message: "Email et mot de passe requis" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.status(401).json({ success: false, message: "Mot de passe invalide" });

//     const token = generateToken(user._id);
//     res.json({ success: true, message: "Connexion réussie", userData: user, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Erreur lors de la connexion" });
//   }
// };

import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "L'utilisateur existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageFile ? imageFile.path : null,
      role: "candidat",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Inscription réussie",
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'inscription",
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe invalide",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion",
    });
  }
};

export const githubLogin = async (githubUser) => {
  let user = await User.findOne({ email: githubUser.email });

  if (!user) {
    user = await User.create({
      name: githubUser.name || githubUser.login,
      email: githubUser.email,
      image: githubUser.avatar_url,
      password: null, // OAuth
      role: "candidat",
      provider: "github",
    });
  }

  const token = generateToken(user._id);

  return {
    userData: {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
    token,
  };
};
