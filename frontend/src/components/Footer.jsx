import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Footer = () => {
  const offers = [
    {
      title: "Basic",
      color: "blue",
      price: "Gratuit - jusqu'à 3 annonces par mois",
    },
    {
      title: "Premium",
      color: "green",
      price: "50 000 FCFA / 88,40 USD - Multipliez par 2 les candidatures",
    },
    {
      title: "Illimité",
      color: "purple",
      price: "195 000 FCFA / 344,76 USD - Publiez toutes vos annonces Premium",
    },
  ];

  const colorClasses = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-600",
      bgHover: "hover:bg-blue-700",
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-600",
      bgHover: "hover:bg-green-700",
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-600",
      bgHover: "hover:bg-purple-700",
    },
  };

  const features = [
    "Logo gratuit sur votre annonce",
    "Alerte par email des candidatures reçues",
    "Réception de candidatures de profils non-inscrits sur le site",
    "Accompagnement pendant la diffusion de votre annonce",
    "Multidiffusion de votre annonce",
    "Envoi de votre offre d'emploi aux candidats en veille de notre CVthèque",
    "Remontée de votre annonce en tête de liste",
    "Filtres de gestion des candidatures reçues",
    "Tri automatique des candidatures reçues par pertinence (Matching)",
    "Tableau de synthèse Excel des candidatures reçues",
    "Réception par email des candidatures (Option)",
    "Blocage des candidatures non pertinentes (Option)",
    "Publication de votre annonce en mode anonyme (Option)",
    "Publication de toutes vos annonces en illimité",
  ];

  return (
    <footer className="mt-20 py-12 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Logo */}
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-4">
          <Link to="/">
            <img
              className="w-[150px] object-contain"
              src={assets.logo}
              alt="Company Logo"
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="flex flex-col sm:flex-row items-center gap-8 text-white text-lg md:text-xl font-semibold">
          {[
            { label: "Qui sommes-nous ?", link: "/about" },
            { label: "Plan du site", link: "/sitemap" },
            { label: "FAQ", link: "/faq" },
            { label: "Contact", link: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="relative group transition-all duration-300"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          {["facebook", "twitter", "instagram", "linkedin"].map((network) => (
            <a key={network} href="#" className="hover:scale-110">
              <img
                src={assets[`${network}_icon`]}
                alt={network}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Offers */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Publiez vos annonces d'emploi et recrutez !
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {offers.map(({ title, color, price }) => (
            <div
              key={title}
              className="flex-1 bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition hover:-translate-y-2"
            >
              <h3 className={`text-2xl font-bold mb-3 ${colorClasses[color].text}`}>
                {title}
              </h3>
              <p className="mb-6 font-semibold text-lg text-gray-700">{price}</p>

              <button
                className={`w-full ${colorClasses[color].bg} ${colorClasses[color].bgHover} text-white py-3 rounded-lg mb-6 font-semibold transition`}
              >
                Publier une annonce {title}
              </button>

              <ul className="space-y-2 text-gray-700">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
