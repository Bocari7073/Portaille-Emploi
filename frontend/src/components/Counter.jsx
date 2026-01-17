import React from "react";
import { assets } from "../assets/assets";
import { CheckCheck } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const Counter = () => {
  return (
    <section className="mt-24">
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 mb-16">
        {/* Image */}
        <div className="lg:w-1/2 w-full flex">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ stiffness: 90, delay: 0.1 }}
            src={assets.counter_image}
            alt="People working together"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center">
          <div className="py-6 lg:py-0 lg:px-8">
            <motion.h1
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            >
              Des millions d'emplois. Trouvez celui qui vous convient.{" "}
              <span className="text-blue-600">ça te va.</span>
            </motion.h1>
            <motion.p
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="visible"
              className="text-lg text-gray-700 mb-8"
            >
              Recherchez tous les postes vacants sur le web. Obtenez votre
              estimation salariale personnalisée. Consultez les avis sur plus de 600 000
              entreprises dans le monde entier.
            </motion.p>

            <motion.ul
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="visible"
              className="space-y-4 mb-8"
            >
              <li className="flex items-start gap-3">
                <CheckCheck className="text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Apporter à la table une survie gagnant-gagnant
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCheck className="text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Tirer parti des opportunités les plus faciles à saisir pour identifier
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCheck className="text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Mais je dois vous expliquer comment tout cela
                </span>
              </li>
            </motion.ul>

            <motion.button
              variants={SlideUp(0.6)}
              initial="hidden"
              whileInView="visible"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Commencer
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-blue-50 rounded-lg shadow-lg">
        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp
              start={1}
              end={898}
              duration={3}
              enableScrollSpy
              scrollSpyOnce
            >
              {({ countUpRef }) => <span ref={countUpRef}></span>}
            </CountUp>
            <span>K</span>
          </div>
          <span className="text-gray-700">Utilisateurs actifs quotidiens</span>
        </div>

        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp
              start={1}
              end={298}
              duration={3}
              enableScrollSpy
              scrollSpyOnce
              suffix="+"
            >
              {({ countUpRef }) => <span ref={countUpRef}></span>}
            </CountUp>
          </div>
          <span className="text-gray-700">Postes Ouverts</span>
        </div>

        <div className="text-center p-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <CountUp
              start={1}
              end={20000}
              duration={3}
              enableScrollSpy
              scrollSpyOnce
              suffix="+"
            >
              {({ countUpRef }) => <span ref={countUpRef}></span>}
            </CountUp>
          </div>
          <span className="text-gray-700">Histoires partagées</span>
        </div>
      </div>
    </section>
  );
};

export default Counter;
