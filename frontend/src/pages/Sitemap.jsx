import React from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Plan du site</h1>

      <ul className="flex flex-col gap-3 text-gray-700">
        <Link to="/" className="hover:text-black">Accueil</Link>
        <Link to="/about" className="hover:text-black">Qui sommes-nous ?</Link>
        <Link to="/faq" className="hover:text-black">FAQ</Link>
        <Link to="/contact" className="hover:text-black">Contact</Link>
      </ul>
    </div>
  );
};

export default Sitemap;
