import {
  Briefcase,
  ChevronDown,
  LoaderCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { isLogin, userData, userDataLoading, setIsLogin } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Accueil", path: "/" },
    { name: "Offres d'emploi", path: "/all-jobs/all" },
    { name: "À propos", path: "/about" },
    { name: "Termes", path: "/terms" },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('[aria-label="Toggle menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("Déconnexion réussie !");
    navigate("/candidate-login");
    setIsLogin(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // ✅ Composant interne pour les liens du profil
  const ProfileLinks = ({ isMobile = false }) => (
  <div className={isMobile ? "mt-6 pt-6 border-t border-blue-600 space-y-4" : "relative"}>
    {!isMobile && (
      <button
        onClick={toggleProfileMenu}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 font-medium"
      >
        Salut, {userData?.name || "User"}
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={userData?.image || assets.avatarPlaceholder}
          alt="User profile"
        />
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`}
        />
      </button>
    )}

    {(isProfileMenuOpen || isMobile) && (
      <div
        className={
          isMobile
            ? ""
            : "absolute right-0 top-12 mt-2 w-56 origin-top-right rounded-md border border-gray-200 bg-white text-gray-700 z-50 overflow-hidden shadow-lg"
        }
      >
        <Link
          to="/upload-cv"
          className={`flex items-center px-4 py-2 ${
            isMobile ? "text-lg" : "text-sm"
          } hover:bg-gray-100 gap-2`}
        >
          <Briefcase size={16} /> Mon Compte
        </Link>

        <Link
          to="/applications"
          className={`flex items-center px-4 py-2 ${
            isMobile ? "text-lg" : "text-sm"
          } hover:bg-gray-100 gap-2`}
        >
          <Briefcase size={16} /> Emplois appliqués
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full text-left flex items-center px-4 py-2 ${
            isMobile ? "text-lg" : "text-sm"
          } hover:bg-gray-100 gap-2`}
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    )}
  </div>
);


  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img className="w-[140px]" src={assets.logo} alt="Lecruiter Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-lg font-semibold">
            {menu.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-all duration-300 ${
                      isActive ? "text-yellow-300 bg-blue-800 font-bold" : "hover:text-yellow-300 hover:bg-blue-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          {userDataLoading ? (
            <LoaderCircle className="animate-spin text-white hidden lg:block" />
          ) : isLogin ? (
            <div className="hidden lg:flex items-center gap-4" ref={profileMenuRef}>
              <ProfileLinks />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/recruiter-login"
                className="px-4 py-2 rounded-md bg-yellow-400 text-blue-700 font-semibold hover:bg-yellow-300 transition-all duration-300"
              >
                Connexion recruteur
              </Link>
              <Link
                to="/candidate-login"
                className="px-4 py-2 rounded-md bg-yellow-500 text-blue-700 font-semibold hover:bg-yellow-400 transition-all duration-300"
              >
                Connexion Candidat
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          ref={mobileMenuRef}
        >
          <div className="fixed inset-0 bg-blue-800/70" onClick={toggleMenu} />
          <div className="relative flex flex-col w-4/5 max-w-sm h-full bg-blue-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" onClick={toggleMenu}>
                <img className="h-10" src={assets.logo} alt="Lecruiter Logo" />
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:bg-blue-600"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-4 text-lg font-semibold text-white">
              {menu.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition-all duration-300 ${
                        isActive ? "bg-blue-600 text-yellow-300 font-bold" : "hover:bg-blue-600 hover:text-yellow-300"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {isLogin ? (
              <ProfileLinks isMobile />
            ) : (
              <div className="mt-6 space-y-3">
                <Link
                  to="/recruiter-login"
                  onClick={toggleMenu}
                  className="block w-full bg-yellow-400 text-blue-700 px-4 py-2 rounded-md text-center font-semibold hover:bg-yellow-300 transition-all duration-300"
                >
                  Connexion recruteur
                </Link>
                <Link
                  to="/candidate-login"
                  onClick={toggleMenu}
                  className="block w-full bg-yellow-500 text-blue-700 px-4 py-2 rounded-md text-center font-semibold hover:bg-yellow-400 transition-all duration-300"
                >
                  Connexion Candidat
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
