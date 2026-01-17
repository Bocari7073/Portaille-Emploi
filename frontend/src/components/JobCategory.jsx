import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryIcon } from "../assets/assets";
import { motion } from "framer-motion";
import { SlideLeft } from "../utils/Animation";

const JobCategory = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (index, name) => {
      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 150);
      navigate(`/all-jobs/${encodeURIComponent(name)}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  return (
    <section className="mt-24 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Engagés pour l'emploi au MALI et en Afrique
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Découvrez les meilleures catégories d'emplois adaptées à vos compétences et à vos objectifs de carrière.
        </p>
      </div>

      {/* Grid of Categories */}
      <motion.div
        variants={SlideLeft(0.3)}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6"
      >
        {Array.isArray(categoryIcon) &&
          categoryIcon.map((icon, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                onClick={() => handleClick(index, icon.name)}
                onKeyDown={(e) => e.key === "Enter" && handleClick(index, icon.name)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                className={`relative group bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg cursor-pointer flex flex-col items-center text-center transition-all duration-300 ${
                  isActive ? "scale-[0.97] bg-blue-100 border-blue-300 shadow-md" : ""
                }`}
              >
                <div className="bg-blue-50 p-4 rounded-full mb-4 transition-transform group-hover:scale-110">
                  <img
                    className="w-8 h-8 md:w-10 md:h-10"
                    src={icon.icon}
                    alt={icon.name}
                    title={icon.name}
                    loading="lazy"
                  />
                </div>
                <span className="font-semibold text-gray-800 text-base md:text-lg">
                  {icon.name}
                </span>
              </div>
            );
          })}
      </motion.div>

      {/* CTA Signup */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/candidate-signup")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Créez votre compte maintenant
        </button>
      </div>
    </section>
  );
};

export default JobCategory;
