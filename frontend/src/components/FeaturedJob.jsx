import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const FeaturedJob = () => {
  const { jobs, jobLoading } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section className="mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Offres d'emploi en vedette
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Connaissez votre valeur et trouvez le travail qui vous donne les moyens de réussir.
        </p>
      </div>

      {/* Loader / Jobs */}
      {jobLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Loader />
        </div>
      ) : !Array.isArray(jobs) || jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Aucun Emploi Trouvé</p>
      ) : (
        <>
          <motion.div
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[...jobs]
              .reverse()
              .slice(0, 6)
              .map((job, index) => (
                <JobCard job={job} key={job.id || index} />
              ))}
          </motion.div>

          <motion.div
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                navigate("/all-jobs/all");
                window.scrollTo(0, 0);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Voir plus
            </button>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeaturedJob;
