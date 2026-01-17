import axios from "axios";
import { Lock, Mail, Upload, UserRound, LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RecruiterSignup = () => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setCompanyData, setCompanyToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Crée l'URL de preview quand le logo change
  useEffect(() => {
    if (companyLogo) {
      const url = URL.createObjectURL(companyLogo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [companyLogo]);

  const recruiterSignup = async (e) => {
    e.preventDefault();
    if (!backendUrl) {
      toast.error("Backend URL non défini !");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", companyLogo);

      const { data } = await axios.post(
        `${backendUrl}/company/register-company`,
        formData
      );

      if (data.success) {
        setCompanyToken(data.token);
        setCompanyData(data.companyData);
        localStorage.setItem("companyToken", data.token);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Échec de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 bg-white shadow">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-700 mb-1.5">
                Inscription du recruteur
              </h1>
              <p className="text-sm text-gray-600">
                Créez un compte pour publier des offres d'emploi.
              </p>
            </div>

            <form className="space-y-4" onSubmit={recruiterSignup}>
              {/* Logo Upload */}
              <div className="flex flex-col items-center mb-4">
                <label className="relative cursor-pointer flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Aperçu du logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-400" />
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setCompanyLogo(e.target.files[0])}
                      required
                    />
                  </div>
                  <span className="block text-xs mt-2 text-gray-500">
                    {companyLogo ? "Changer logo" : "Upload du logo de l'entreprise"}
                  </span>
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                <div className="border border-gray-300 rounded flex items-center p-2.5">
                  <UserRound className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    className="w-full outline-none text-sm bg-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="border border-gray-300 rounded flex items-center p-2.5">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none text-sm bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="border border-gray-300 rounded flex items-center p-2.5">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="Créer un mot de passe"
                    className="w-full outline-none text-sm bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <label
                htmlFor="terms-checkbox"
                className="text-sm text-gray-600 flex items-center gap-2 cursor-pointer"
              >
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  required
                />
                J'accepte les{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Termes et conditions
                </Link>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin h-5 w-5" />
                ) : (
                  "Créer un compte"
                )}
              </button>

              <div className="text-center text-sm text-gray-600 pt-2">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/recruiter-login"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RecruiterSignup;
