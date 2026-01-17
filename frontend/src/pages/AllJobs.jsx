import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";
import { useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

const AllJobs = () => {
  const { jobs, jobLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState({
    title: "",
  });

  const [toggle, setToggle] = useState({
    metiers: false,
    secteurs: false,
    etudes: false,
    experience: false,
    contrat: false,
    regions: false,
    langues: false,
  });

  const categoriesTop = [
    { label: "Tous les emplois", value: "all" },
    { label: "Emplois Management", value: "management" },
    { label: "Emplois IT", value: "it" },
    { label: "Emplois Commercial", value: "commercial" },
  ];

  const fakeFilters = {
    metiers: [
      "Développeur",
      "Comptable",
      "Designer",
      "Chef de projet",
      "Vendeur",
      "Ressources Humaines",
      "Logisticien",
      "Ingénieur",
      "Enseignant",
      "Infirmier",
    ],
    secteurs: [
      "Informatique",
      "Finance",
      "Santé",
      "Éducation",
      "Marketing",
      "Vente",
      "Ressources Humaines",
      "Logistique",
      "Construction",
      "Tourisme",
      "Agriculture",
      "Télécommunications",
      "Énergie",
      "Transport",
    ],
    etudes: ["Licence", "Master", "Doctorat"],
    experience: ["0-1 an", "2-5 ans", "5 ans+"],
    contrat: ["CDI", "CDD", "Stage"],
    regions: [
      "Bamako",
      "Sikasso",
      "Kayes",
      "Mopti",
      "Tombouctou",
      "Gao",
      "Kidal",
      "Segou",
    ],
    langues: [
      "Français",
      "Anglais",
      "Bambara",
      "Dogon",
      "Peulh",
      "Soninké",
      "Tamasheq",
      "Malinké",
      "Sénoufo",
    ],
  };

  const handleToggle = (key) => {
    setToggle({ ...toggle, [key]: !toggle[key] });
  };

  const handleChange = (e) => {
    setSearchInput({ ...searchInput, title: e.target.value });
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (searchInput.title.trim()) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchInput.title.toLowerCase())
      );
    }

    return result;
  }, [jobs, searchInput]);

  return (
    <div className="px-6 md:px-10 py-16 min-h-screen bg-blue-50">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">
        Rechercher un emploi
      </h1>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 justify-center mb-10">
        <button className="bg-blue-700 text-white px-5 py-2 rounded-md shadow hover:bg-blue-800 transition-all">
          Rechercher
        </button>

        <label className="text-blue-900 font-medium">Recherche :</label>

        <input
          type="text"
          name="title"
          placeholder="Titre du poste..."
          value={searchInput.title}
          onChange={handleChange}
          className="border border-blue-300 rounded-lg px-4 py-2 w-64 
          focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        />
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT FILTER COLUMN */}
        <div className="space-y-6">

          {Object.keys(fakeFilters).map((key) => (
            <div key={key} className="border border-blue-200 p-4 rounded-lg bg-white shadow-sm">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(key)}
              >
                <h3 className="font-semibold text-blue-900 capitalize">
                  {key.replace(/_/g, " ")}
                </h3>

                {toggle[key] ? (
                  <Minus size={20} className="text-blue-700" />
                ) : (
                  <Plus size={20} className="text-blue-700" />
                )}
              </div>

              {toggle[key] && (
                <ul className="mt-3 space-y-2 text-blue-800">
                  {fakeFilters[key].map((item, i) => (
                    <li key={i} className="cursor-pointer hover:text-blue-600">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="md:col-span-3">

          {/* TOP CATEGORIES */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {categoriesTop.map((cat) => (
              <button
                key={cat.value}
                onClick={() => navigate(`/all-jobs/${cat.value}`)}
                className="px-4 py-2 bg-white border border-blue-300 rounded-full shadow 
                hover:bg-blue-100 hover:text-blue-700 transition-all"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            {filteredJobs.length} résultats trouvés
          </span>

          {/* JOB LIST */}
          {jobLoading ? (
            <div className="flex justify-center mt-20">
              <Loader />
            </div>
          ) : filteredJobs.length === 0 ? (
            <p className="text-blue-800 text-center mt-12">
              Aucune offre ne correspond à votre recherche.
            </p>
          ) : (
            <motion.div
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
