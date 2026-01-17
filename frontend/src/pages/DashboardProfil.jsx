// // import React from "react";
// // import Profile from "./Profile";

// // const DashboardProfil = () => {
// //   return <Profile />;
// // };

// // export default DashboardProfil;

// // import React from "react";
// // import Profile from "./Profile";

// // const DashboardProfil = () => {
// //   return (
// //     <div className="p-6">
// //       <h2 className="text-xl font-semibold mb-4">Mon profil candidat</h2>
// //       <Profile />
// //     </div>
// //   );
// // };

// // export default DashboardProfil;

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { FiEye, FiEyeOff, FiMail, FiLock, FiLogOut } from "react-icons/fi";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

// export default function DashboardProfil() {
//   const navigate = useNavigate();
//   const { userToken, setUserToken, setUserData, setIsLogin, backendUrl, fetchUserData } = useContext(AppContext);

//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [file, setFile] = useState(null);
//   const [cvError, setCvError] = useState("");
//   const [activeTab, setActiveTab] = useState("cv");

//   const [profile, setProfile] = useState({
//     nom: "", prenom: "", email: "", telephone: "", naissance: "", lieuNaissance: "",
//     sexe: "", nationalite: "", adresse: ""
//   });

//   const [formation, setFormation] = useState([{ debut: "", fin: "", titre: "", etablissement: "", description: "" }]);
//   const [experience, setExperience] = useState([{ debut: "", fin: "", poste: "", entreprise: "", description: "" }]);

//   const [changeEmail, setChangeEmail] = useState(false);
//   const [changePassword, setChangePassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
//   const [passwordError, setPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

//   const inputClass = "w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

//   // ----------------- PHOTO -----------------
//   const handleProfilePhoto = (e) => {
//     const file = e.target.files[0];
//     if (file) setProfilePhoto(URL.createObjectURL(file));
//   };

//   // ----------------- CV -----------------
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;
//     const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
//     if (!allowed.includes(selected.type)) {
//       setCvError("Format non valide. Veuillez importer un PDF ou DOCX.");
//       setFile(null);
//       toast.error("Format non valide. PDF ou DOCX uniquement.");
//       return;
//     }
//     setFile(selected);
//     setCvError("");
//     toast.success(`Fichier sélectionné : ${selected.name}`);
//   };

//   // ----------------- ENVOI PROFIL -----------------
//   const handleCvSubmit = async (e) => {
//     e.preventDefault();
//     if (!userToken) {
//       toast.error("Vous devez être connecté !");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profile", JSON.stringify(profile));
//     formData.append("formation", JSON.stringify(formation));
//     formData.append("experience", JSON.stringify(experience));

//     if (file) formData.append("cv", file);

//     if (profilePhoto) {
//       const photoBlob = await fetch(profilePhoto).then((r) => r.blob());
//       formData.append("image", photoBlob, "profile.jpg");
//     }

//     try {
//       const response = await axios.post(
//         `${backendUrl}/user/candidat/profil`,
//         formData,
//         { headers: { Authorization: `Bearer ${userToken}`, "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         toast.success("Profil enregistré avec succès 🎉");
//         await fetchUserData();
//         navigate("/candidat/confirmation");
//       } else {
//         toast.error(response.data.message || "Erreur lors de l'enregistrement");
//       }
//     } catch (error) {
//       console.error("Erreur upload profil :", error);
//       toast.error(error?.response?.data?.message || "Erreur serveur lors de l'enregistrement");
//     }
//   };

//   // ----------------- FORMATION & EXPERIENCE -----------------
//   const handleFormationChange = (index, e) => {
//     const newFormations = [...formation];
//     newFormations[index][e.target.name] = e.target.value;
//     setFormation(newFormations);
//   };
//   const addFormation = () => setFormation([...formation, { debut: "", fin: "", titre: "", etablissement: "", description: "" }]);

//   const handleExperienceChange = (index, e) => {
//     const newExp = [...experience];
//     newExp[index][e.target.name] = e.target.value;
//     setExperience(newExp);
//   };
//   const addExperience = () => setExperience([...experience, { debut: "", fin: "", poste: "", entreprise: "", description: "" }]);

//   // ----------------- PROFIL -----------------
//   const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

//   // ----------------- IDENTIFIANTS -----------------
//   const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   const handleIdentifiantsSubmit = (e) => {
//     e.preventDefault();
//     if ((changeEmail || changePassword) && !passwords.current.trim()) return toast.error("Mot de passe actuel requis.");
//     if (changePassword && passwords.new !== passwords.confirm) {
//       setPasswordError("Les mots de passe ne correspondent pas.");
//       return toast.error("Les mots de passe ne correspondent pas.");
//     }
//     setPasswordError("");
//     if (changeEmail) toast.success(`Email modifié : ${email}`);
//     if (changePassword) toast.success("Mot de passe modifié !");
//     setPasswords({ current: "", new: "", confirm: "" });
//     setEmail(""); 
//     setChangeEmail(false); 
//     setChangePassword(false);
//     setShowPassword({ current: false, new: false, confirm: false });
//   };

//   // ----------------- LOGOUT -----------------
//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     setUserToken(null);
//     setUserData(null);
//     setIsLogin(false);
//     toast.success("Déconnexion réussie !");
//     navigate("/candidate-login");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <Toaster position="top-right" />
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-center lg:text-left">Tableau de bord - Mon Profil</h1>
//         <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition flex items-center gap-2">
//           <FiLogOut /> Déconnexion
//         </button>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Tabs */}
//         <div className="flex lg:flex-col gap-2 lg:w-1/4">
//           {[{ key: "cv", label: "Profil & CV", color: "blue" }, { key: "identifiants", label: "Modifier mes identifiants", color: "yellow" }].map(tab => (
//             <button key={tab.key} className={`p-3 rounded-lg font-semibold w-full text-left transition ${activeTab === tab.key ? `bg-${tab.color}-600 text-white shadow-lg` : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => setActiveTab(tab.key)}>
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="lg:w-3/4 bg-white p-6 rounded-xl shadow-md">
//           {activeTab === "cv" && (
//             <form onSubmit={handleCvSubmit} className="space-y-6">
//               {/* PHOTO */}
//               <div className="flex flex-col items-center mb-4">
//                 <label className="font-medium text-gray-600 mb-2">Photo de profil</label>
//                 <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer hover:border-blue-500 relative">
//                   <input type="file" accept="image/*" className="absolute w-32 h-32 opacity-0 cursor-pointer" onChange={handleProfilePhoto} />
//                   {profilePhoto ? <img src={profilePhoto} alt="Profil" className="w-32 h-32 object-cover rounded-full" /> : <span className="text-gray-400 text-center text-sm">Cliquez pour ajouter</span>}
//                 </div>
//               </div>

//               {/* Infos personnelles */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.keys(profile).map(key => (
//                   <input key={key} type={key === "email" ? "email" : "text"} name={key} value={profile[key]} onChange={handleProfileChange} placeholder={key} className="border p-3 rounded-lg" />
//                 ))}
//               </div>

//               {/* Formation */}
//               <h3 className="text-xl font-semibold mt-6">Formation</h3>
//               {formation.map((f, i) => (
//                 <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   {["debut","fin","titre","etablissement","description"].map(field => (
//                     <input key={field} type="text" name={field} value={f[field]} onChange={(e) => handleFormationChange(i,e)} placeholder={field} className="border p-3 rounded-lg" />
//                   ))}
//                   {formation.length > 1 && <button type="button" onClick={() => setFormation(formation.filter((_, idx) => idx !== i))} className="text-red-500 font-semibold hover:underline ml-2">Supprimer</button>}
//                 </div>
//               ))}
//               <button type="button" onClick={addFormation} className="bg-green-500 text-white px-4 py-2 rounded-lg">Ajouter formation</button>

//               {/* Expérience */}
//               <h3 className="text-xl font-semibold mt-6">Expérience professionnelle</h3>
//               {experience.map((exp,i) => (
//                 <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   {["debut","fin","poste","entreprise","description"].map(field => (
//                     <input key={field} type="text" name={field} value={exp[field]} onChange={(e) => handleExperienceChange(i,e)} placeholder={field} className="border p-3 rounded-lg" />
//                   ))}
//                   {experience.length > 1 && <button type="button" onClick={() => setExperience(experience.filter((_, idx) => idx !== i))} className="text-red-500 font-semibold hover:underline ml-2">Supprimer</button>}
//                 </div>
//               ))}
//               <button type="button" onClick={addExperience} className="bg-green-500 text-white px-4 py-2 rounded-lg">Ajouter expérience</button>

//               {/* Upload CV */}
//               <div className="mt-6">
//                 <label className="block font-medium text-gray-600 mb-2">Téléverser votre CV (PDF ou DOCX)</label>
//                 <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 transition" />
//                 {cvError && <p className="text-red-500">{cvError}</p>}
//               </div>

//               <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition">Enregistrer & Envoyer le CV</button>
//             </form>
//           )}

//           {/* Identifiants */}
//           {activeTab === "identifiants" && (
//             <form onSubmit={handleIdentifiantsSubmit} className="space-y-4">
//               {/* Champ modif email & mot de passe */}
//               {/* ... tu peux garder ton code actuel */}
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogOut } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function DashboardProfil() {
  const navigate = useNavigate();
  const { userToken, setUserToken, setUserData, setIsLogin, backendUrl, fetchUserData } = useContext(AppContext);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [activeTab, setActiveTab] = useState("cv");
  const [file, setFile] = useState(null);
  const [cvError, setCvError] = useState("");

  const [profile, setProfile] = useState({ nom: "", prenom: "", email: "", telephone: "", naissance: "", lieuNaissance: "", sexe: "", nationalite: "", adresse: "" });
  const [formation, setFormation] = useState([{ debut: "", fin: "", titre: "", etablissement: "", description: "" }]);
  const [experience, setExperience] = useState([{ debut: "", fin: "", poste: "", entreprise: "", description: "" }]);

  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

  const inputClass = "w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  // ----------------- PHOTO -----------------
  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  // ----------------- CV -----------------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(selected.type)) {
        setCvError("Format non valide. Veuillez importer un PDF ou DOCX.");
        setFile(null);
        toast.error("Format non valide. PDF ou DOCX uniquement.");
        return;
      }
      setFile(selected);
      setCvError("");
      toast.success(`Fichier sélectionné : ${selected.name}`);
    }
  };

  // ----------------- ENVOI DU PROFIL -----------------
  const handleCvSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = userToken || localStorage.getItem("userToken");
      if (!token) {
        toast.error("Vous devez être connecté !");
        return;
      }

      const formData = new FormData();
      formData.append("profile", JSON.stringify(profile));
      formData.append("formation", JSON.stringify(formation));
      formData.append("experience", JSON.stringify(experience));

      // Nom exact attendu par le backend
      if (file) formData.append("resume", file);
      if (profilePhoto) {
        const photoBlob = await fetch(profilePhoto).then((r) => r.blob());
        formData.append("image", photoBlob, "profile.jpg");
      }

      const response = await axios.post(
        `${backendUrl}/user/candidat/profil`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profil enregistré avec succès 🎉");
        await fetchUserData();
        navigate("/candidat/confirmation"); 
      } else {
        toast.error(response.data.message || "Erreur lors de l'enregistrement");
      }
    } catch (error) {
      console.error("Erreur upload profil :", error);
      toast.error(error?.response?.data?.message || "Erreur serveur lors de l'enregistrement");
    }
  };

  // ----------------- PROFIL -----------------
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleFormationChange = (index, e) => {
    const newFormations = [...formation];
    newFormations[index][e.target.name] = e.target.value;
    setFormation(newFormations);
  };
  const addFormation = () => setFormation([...formation, { debut: "", fin: "", titre: "", etablissement: "", description: "" }]);

  const handleExperienceChange = (index, e) => {
    const newExp = [...experience];
    newExp[index][e.target.name] = e.target.value;
    setExperience(newExp);
  };
  const addExperience = () => setExperience([...experience, { debut: "", fin: "", poste: "", entreprise: "", description: "" }]);

  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleIdentifiantsSubmit = (e) => {
    e.preventDefault();
    if ((changeEmail || changePassword) && passwords.current.trim() === "") return toast.error("Mot de passe actuel requis.");
    if (changePassword && passwords.new !== passwords.confirm) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return toast.error("Les mots de passe ne correspondent pas.");
    }
    setPasswordError("");
    if (changeEmail) toast.success(`Email modifié : ${email}`);
    if (changePassword) toast.success("Mot de passe modifié !");
    setPasswords({ current: "", new: "", confirm: "" });
    setEmail(""); 
    setChangeEmail(false); 
    setChangePassword(false);
    setShowPassword({ current: false, new: false, confirm: false });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    setIsLogin(false);
    toast.success("Déconnexion réussie !");
    navigate("/candidate-login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      {/* ... le reste du JSX reste inchangé ... */}
      <form onSubmit={handleCvSubmit}>
        {/* inputs et boutons CV & Photo */}
      </form>
    </div>
  );
}
