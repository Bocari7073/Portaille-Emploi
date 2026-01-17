import React, { useContext, useRef, useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", link: "https://www.google.com/careers" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", link: "https://www.meta.com/careers" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", link: "https://www.amazon.jobs" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link: "https://careers.microsoft.com" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", link: "https://www.apple.com/jobs" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", link: "https://www.ibm.com/careers" },
];

const regions = ["Bamako","Sikasso","Kayes","Mopti","Tombouctou","Gao","Koulikoro","Segou"];
const metiers = ["Développeur","Designer","Chef de projet","Comptable","Ingénieur","Marketing","Commercial","Ressources Humaines"];

const Hero = () => {
  const navigate = useNavigate();
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const metierRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedMetier, setSelectedMetier] = useState("");
  const [showRegionList, setShowRegionList] = useState(false);
  const [showMetierList, setShowMetierList] = useState(false);

  const controls = useAnimation(); // Pour contrôler l'animation du carrousel

  // Pause carrousel au survol
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-100%"],
        transition: { x: { repeat: Infinity, duration: 20, ease: "linear" } }
      });
    }
  }, [isHovered, controls]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowRegionList(false);
        setShowMetierList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchFilter({
      title: titleRef.current.value,
      location: selectedRegion,
      metier: selectedMetier,
    });
    setIsSearched(true);
    if (titleRef.current.value || selectedRegion || selectedMetier) {
      navigate("/all-jobs/all");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg py-16 px-6 md:px-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Heading */}
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4 leading-tight sm:leading-snug" variants={SlideUp(0.4)} initial="hidden" animate="visible">
          Il y a <span className="text-blue-700">93,178</span> Publications ici Pour toi!
        </motion.h1>

        <motion.p className="text-gray-600 mb-10" variants={SlideUp(0.4)} initial="hidden" animate="visible">
          Votre prochaine grande étape de carrière commence ici — découvrez les meilleures offres d'emploi. Saisissez les opportunités et faites le premier pas vers votre avenir !
        </motion.p>

        {/* Search Form */}
        <motion.form onSubmit={searchHandler} className="bg-white rounded-lg shadow p-3 flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center w-full relative" variants={SlideUp(0.5)} initial="hidden" animate="visible" ref={containerRef}>
          {/* Job Title Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 md:py-2.5 bg-white w-full">
            <Search className="text-gray-400 mr-2 shrink-0" />
            <input type="text" name="job" placeholder="Mot clé" aria-label="Title" autoComplete="on" className="w-full outline-none text-sm bg-transparent placeholder-gray-500" ref={titleRef} />
          </div>

          {/* Région Autocomplete */}
          <div className="relative w-full">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 md:py-2.5 bg-white w-full cursor-pointer" onClick={() => setShowRegionList(!showRegionList)}>
              <MapPin className="text-gray-400 mr-2 shrink-0" />
              <input type="text" name="region" placeholder="Région" aria-label="Région" autoComplete="off" className="w-full outline-none text-sm bg-transparent placeholder-gray-500" value={selectedRegion} onChange={(e) => { setSelectedRegion(e.target.value); setShowRegionList(true); }} ref={locationRef} />
            </div>
            {showRegionList && (
              <ul className="border border-gray-300 rounded-md mt-1 bg-white shadow-md max-h-40 overflow-auto z-50 absolute w-full">
                {regions.filter((region) => region.toLowerCase().includes(selectedRegion.toLowerCase())).map((region) => (
                  <li key={region} className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm" onClick={() => { setSelectedRegion(region); setShowRegionList(false); }}>{region}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Métier Autocomplete */}
          <div className="relative w-full">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 md:py-2.5 bg-white w-full cursor-pointer" onClick={() => setShowMetierList(!showMetierList)}>
              <Briefcase className="text-gray-400 mr-2 shrink-0" />
              <input type="text" name="metier" placeholder="Métier" aria-label="Métier" autoComplete="off" className="w-full outline-none text-sm bg-transparent placeholder-gray-500" value={selectedMetier} onChange={(e) => { setSelectedMetier(e.target.value); setShowMetierList(true); }} ref={metierRef} />
            </div>
            {showMetierList && (
              <ul className="border border-gray-300 rounded-md mt-1 bg-white shadow-md max-h-40 overflow-auto z-50 absolute w-full">
                {metiers.filter((metier) => metier.toLowerCase().includes(selectedMetier.toLowerCase())).map((metier) => (
                  <li key={metier} className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm" onClick={() => { setSelectedMetier(metier); setShowMetierList(false); }}>{metier}</li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 md:py-3 px-6 rounded-md transition text-sm cursor-pointer">Recherche</button>
        </motion.form>

        {/* Entreprises qui recrutent */}
        <motion.div className="mt-10" variants={SlideUp(0.6)} initial="hidden" animate="visible">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Entreprises qui recrutent</h2>
          <motion.div className="flex space-x-4 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} animate={controls}>
            {companies.concat(companies).map((company, idx) => (
              <a
                key={idx}
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center w-32 h-20 shadow hover:shadow-md transition cursor-pointer"
              >
                <img src={company.logo} alt={company.name} className="max-h-12 object-contain" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
