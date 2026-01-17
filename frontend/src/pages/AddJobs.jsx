// import React, { useContext, useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { LoaderCircle } from "lucide-react";

// const AddJob = () => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Programmation");
//   const [location, setLocation] = useState("Dhaka");
//   const [level, setLevel] = useState("Intermédiaire");
//   const [salary, setSalary] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { backendUrl, companyToken } = useContext(AppContext);

//   const postJob = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/company/post-job`,
//         {
//           title,
//           description,
//           category,
//           location,
//           level,
//           salary,
//         },
//         {
//           headers: { token: companyToken },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setTitle("");
//         setDescription("");
//         setCategory("Programmation");
//         setLocation("Dhaka");
//         setLevel("Intermédiaire");
//         setSalary(null);

//         if (quillRef.current) {
//           quillRef.current.root.innerHTML = "";
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         placeholder: "Ecrire la description du travail...",
//       });

//       quillRef.current.on("text-change", () => {
//         const html = editorRef.current.querySelector(".ql-editor").innerHTML;
//         setDescription(html);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     document.title = "DHCOM | Dashboard";
//   }, []);

//   return (
//     <section className="mr-1 mb-6">
//       <form onSubmit={postJob}>
//         {/* Titre d'emploi */}
//         <div className="mb-6">
//           <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//             Titre d'emploi
//           </label>
//           <input
//             type="text"
//             placeholder="Entrer le Titre d'emploi"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Description de l'emploi */}
//         <div className="mb-6">
//           <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//             Description de l'emploi
//           </label>
//           <div
//             ref={editorRef}
//             style={{
//               minHeight: "150px",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               padding: "10px",
//             }}
//           />
//         </div>

//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           {/* Catégorie d'emploi */}
//           <div>
//             <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//               Catégorie d'emploi
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="Programmation">Programmation</option>
//               <option value="Science des données">Science des données</option>
//               <option value="Conception">Conception</option>
//               <option value="Réseautage">Réseautage</option>
//               <option value="Management">Management</option>
//               <option value="Marketing">Marketing</option>
//               <option value="Cybersecurite">Cybersecurite</option>
//             </select>
//           </div>

//           {/* Job Location */}
//           <div>
//             <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//               Lieu de travail
//             </label>
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="Bamako">Bamako</option>
//               <option value="Kaye">Kaye</option>
//               <option value="Sikasso">Sikasso</option>
//               <option value="Koutiala">Koutiala</option>
//               <option value="Ségou">Ségou</option>
//               <option value="Mopti">Mopti</option>
//               <option value="Gao">Gao</option>
//               <option value="Tounbouctou">Tounbouctou</option>
//               <option value="Kidal">Kidal</option>
//               <option value="San">San</option>
//               <option value="Nioro">Nioro</option>
//               <option value="Sévaré">Sévaré</option>
//               <option value="Badiangara">Badiangara</option>
//               <option value="Bankase">Bankase</option>
//               <option value="San">San</option>
//               <option value="Niono">Niono</option>
//               <option value="Kati">Kati</option>
//               <option value="Koulikoro">Koulikoro</option>
//             </select>
//           </div>

//           {/* Job Level */}
//           <div>
//             <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//               Niveau d'emploi
//             </label>
//             <select
//               value={level}
//               onChange={(e) => setLevel(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="Débutant">Débutant</option>
//               <option value="Intermédiaire">Intermédiaire</option>
//               <option value="Senior">Senior</option>
//             </select>
//           </div>

//           {/* Salary */}
//           <div>
//             <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
//               Salaire
//             </label>
//             <input
//               type="number"
//               placeholder="Entrez l'échelle salariale"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={salary}
//               onChange={(e) => setSalary(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* Bouton Soumettre */}
//         <button
//           type="Soumettre"
//           disabled={loading}
//           className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-8 font-semibold rounded ${
//             loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
//           }`}
//         >
//           {loading ? (
//             <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
//           ) : (
//             "Ajouter un travail"
//           )}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddJob;


import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programmation");
  const [location, setLocation] = useState("Dhaka");
  const [level, setLevel] = useState("Intermédiaire");
  const [salary, setSalary] = useState(""); // ⚡ initialisé avec chaîne vide
  const [loading, setLoading] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  const postJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/post-job`,
        {
          title,
          description,
          category,
          location,
          level,
          salary,
        },
        {
          headers: { Authorization: `Bearer ${companyToken}`, },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("Programmation");
        setLocation("Dhaka");
        setLevel("Intermédiaire");
        setSalary(""); // ⚡ reset à chaîne vide

        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Ecrire la description du travail...",
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setDescription(html || ""); // ⚡ assure que description n’est jamais null
      });
    }
  }, []);

  useEffect(() => {
    document.title = "DHCOM | Dashboard";
  }, []);

  return (
    <section className="mr-1 mb-6">
      <form onSubmit={postJob}>
        {/* Titre d'emploi */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Titre d'emploi
          </label>
          <input
            type="text"
            placeholder="Entrer le Titre d'emploi"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={title || ""} // ⚡ jamais null
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description de l'emploi */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Description de l'emploi
          </label>
          <div
            ref={editorRef}
            style={{
              minHeight: "150px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Catégorie d'emploi */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Catégorie d'emploi
            </label>
            <select
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Programmation">Programmation</option>
              <option value="Science des données">Science des données</option>
              <option value="Conception">Conception</option>
              <option value="Réseautage">Réseautage</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Cybersecurite">Cybersecurite</option>
            </select>
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Lieu de travail
            </label>
            <select
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Bamako">Bamako</option>
              <option value="Kaye">Kaye</option>
              <option value="Sikasso">Sikasso</option>
              <option value="Koutiala">Koutiala</option>
              <option value="Ségou">Ségou</option>
              <option value="Mopti">Mopti</option>
              <option value="Gao">Gao</option>
              <option value="Tounbouctou">Tounbouctou</option>
              <option value="Kidal">Kidal</option>
              <option value="San">San</option>
              <option value="Nioro">Nioro</option>
              <option value="Sévaré">Sévaré</option>
              <option value="Badiangara">Badiangara</option>
              <option value="Bankase">Bankase</option>
              <option value="Niono">Niono</option>
              <option value="Kati">Kati</option>
              <option value="Koulikoro">Koulikoro</option>
            </select>
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Niveau d'emploi
            </label>
            <select
              value={level || ""}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Salaire
            </label>
            <input
              type="number"
              placeholder="Entrez l'échelle salariale"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={salary || ""} // ⚡ jamais null
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Bouton Soumettre */}
        <button
          type="submit" // ⚡ corrigé
          disabled={loading}
          className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-8 font-semibold rounded ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
          ) : (
            "Ajouter un travail"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddJob;
