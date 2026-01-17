import React from "react";
import Counter from "../components/Counter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../utils/Animation";

const About = () => {
  return (
    <>
      <Navbar />

      {/* Counter Section */}
      <Counter />

      {/* About Section */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-900">
          À propos de DHCOM
        </h1>
        <div className="max-w-4xl mx-auto space-y-6 text-center text-gray-700">
          <motion.p
            variants={SlideUp(0.3)}
            initial="hidden"
            whileInView="visible"
            className="leading-relaxed"
          >
            Bien plus que ce rang n'a aperçu un merle bleu après l'extérieur ignoblement
            prétendument plus quand oh arrogamment véhément irrésistiblement pointilleux
            pingouin insecte en plus wow absolument crasseux de manière trompeuse
            dalmatien hâtivement un regard noir en encart un échidné casoar quelques
            perroquet et autant que bonté certains ont gelé le maussade beaucoup connecté
            chauve-souris.
          </motion.p>
          <motion.p
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-lg leading-relaxed"
          >
            J'ai rêvé à plusieurs reprises d'un opossum, hélas, mais de façon dramatique malgré tout.
            Rapidement, que mince alors, oups, comme une anguille en dessous
            Ils restèrent et dormirent confortablement, ronronnant doucement tout là-haut.
            Adapté à un ensemble strident et essuyé de manière capricieuse.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* How It Works Section */}
      <section className="mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600">Un emploi pour tous, partout</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            variants={SlideLeft(0.2)}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src={assets.work_1}
                alt="Évaluations de CV gratuites"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Évaluations de CV gratuites
            </h3>
            <p className="text-gray-700">
              Les employeurs consacrent en moyenne 31 secondes à l'examen des CV pour identifier les profils potentiels.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={SlideLeft(0.4)}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src={assets.work_2}
                alt="Notation d’adéquation à l’emploi"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Notation d’adéquation à l’emploi
            </h3>
            <p className="text-gray-700">
              Notre algorithme avancé évalue votre CV en fonction des critères de l'offre d'emploi.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={SlideLeft(0.6)}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src={assets.work_3}
                alt="Aide à chaque étape du chemin"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Aide à chaque étape du chemin
            </h3>
            <p className="text-gray-700">
              Bénéficiez de conseils d'experts tout au long de votre recherche d'emploi.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
