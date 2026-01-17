import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/contact", // adapte si besoin
        formData
      );

      if (res.data.success) {
        alert("Message envoyé avec succès !");
        setFormData({ nom: "", email: "", message: "" });
      }
    } catch (error) {
      alert("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />

        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="border p-3 rounded-lg h-32 outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          Envoyer le message
        </button>
      </form>

      <p className="mt-6 text-gray-600">
        Vous pouvez aussi nous écrire à :{" "}
        <a
          href="mailto:dynamicrhcom@yahoo.com"
          className="font-semibold text-black underline hover:text-gray-700"
        >
          dynamicrhcom@yahoo.com
        </a>
      </p>
    </div>
  );
};

export default Contact;
