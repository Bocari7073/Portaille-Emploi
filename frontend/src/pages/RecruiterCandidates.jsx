import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FiSearch, FiEye } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const RecruiterCandidates = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const fetchCandidates = async () => {
    if (!companyToken) return;

    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/recruiter/candidates`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      });
      if (res.data.success) setCandidates(res.data.candidates || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Erreur lors de la récupération des candidats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [companyToken]);

  const filteredCandidates = candidates.filter(
    c =>
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.prenom.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCandidates.length / perPage);
  const paginatedCandidates = filteredCandidates.slice((page - 1) * perPage, page * perPage);
  console.log("TOKEN RECRUITER =", companyToken);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Liste des Candidats</h1>

      <div className="mb-4 flex items-center gap-2">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Prénom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">CV</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">Chargement...</td>
              </tr>
            ) : paginatedCandidates.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">Aucun candidat trouvé</td>
              </tr>
            ) : (
              paginatedCandidates.map(c => (
                <tr key={c._id} className="border-b hover:bg-gray-100 transition">
                  <td className="px-4 py-2">{c.nom}</td>
                  <td className="px-4 py-2">{c.prenom}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.telephone}</td>
                  <td className="px-4 py-2">
                    {c.cv ? (
                      <a href={c.cv} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Voir CV</a>
                    ) : "Non fourni"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                      onClick={() => setSelectedCandidate(c)}
                    >
                      <FiEye /> Voir profil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default RecruiterCandidates;
