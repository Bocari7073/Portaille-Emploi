import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const Download = () => {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <motion.h3
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-lg font-semibold text-blue-600 uppercase tracking-wider"
          >
            Téléchargez et profitez
          </motion.h3>

          <motion.h1
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Obtenez le Superio{" "}
            <span className="text-blue-600">Recherche d'emploi</span> Application
          </motion.h1>

          <motion.p
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-lg text-gray-700 max-w-lg mx-auto lg:mx-0"
          >
            Parcourez des millions d'offres d'emploi et trouvez celle qui vous convient.
            Il vous suffit de glisser vers la droite pour postuler à l'emploi de vos rêves en quelques secondes.
          </motion.p>

          {/* App Store Buttons */}
          <motion.div
            variants={SlideUp(0.6)}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
          >
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src={assets.play_store}
                alt="Get on Google Play"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src={assets.app_store}
                alt="Download on the App Store"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
          </motion.div>
        </div>

        {/* App Image */}
        <div className="w-full lg:w-[45%] mt-10 lg:mt-0 flex justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ stiffness: 90, delay: 0.1 }}
            src={assets.download_image}
            alt="Superio App Preview"
            className="w-full max-w-md lg:max-w-none h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
