import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const Faq = () => {
  const faqList = [
    {
      question: "📌 Comment créer un compte ?",
      answer: "Cliquez sur “Inscription” en haut du site et suivez les étapes."
    },
    {
      question: "📌 Comment nous contacter ?",
      answer: "Vous pouvez nous écrire via le formulaire de contact ou par email."
    },
    {
      question: "📌 Où trouver nos services ?",
      answer: "Tous nos services sont indiqués dans le menu principal ou sur le plan du site."
    }
  ];

  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.h1
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="visible"
        className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-900"
      >
        FAQ
      </motion.h1>

      <div className="flex flex-col gap-8">
        {faqList.map((faq, index) => (
          <motion.div
            key={index}
            variants={SlideUp(0.2 + index * 0.1)}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
