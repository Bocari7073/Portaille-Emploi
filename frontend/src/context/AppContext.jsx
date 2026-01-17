import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ---------------- États globaux ----------------
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);

  const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || "");
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(!!userToken);
  const [userApplication, setUserApplication] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const [companyToken, setCompanyToken] = useState(localStorage.getItem("companyToken") || "");
  const [companyData, setCompanyData] = useState(null);
  const [isCompanyLogin, setIsCompanyLogin] = useState(!!companyToken);
  const [companyLoading, setCompanyLoading] = useState(false);

  // ---------------- Synchronisation avec localStorage ----------------
  useEffect(() => {
    if (userToken) localStorage.setItem("userToken", userToken);
    else localStorage.removeItem("userToken");
  }, [userToken]);

  useEffect(() => {
    if (companyToken) localStorage.setItem("companyToken", companyToken);
    else localStorage.removeItem("companyToken");
  }, [companyToken]);

  // ---------------- Fonctions API ----------------
  const fetchUserData = async () => {
    if (!userToken) return;
    setUserDataLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/user-data`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (data.success) setUserData(data.userData || null);
      else {
        toast.error(data.message || "Impossible de récupérer vos données.");
        setUserData(null);
        setIsLogin(false);
        setUserToken("");
       
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Échec de récupération des données utilisateur.");
      setUserData(null);
      setIsLogin(false);
      setUserToken("");
    } finally {
      setUserDataLoading(false);
    }
  };

  const fetchCompanyData = async () => {
    if (!companyToken) return;
    setCompanyLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/company-data`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      });
      if (data.success) setCompanyData(data.companyData || null);
      else {
        toast.error(data.message || "Impossible de récupérer les données de l'entreprise.");
        setCompanyData(null);
        setIsCompanyLogin(false);
        setCompanyToken("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Échec de récupération des données entreprise.");
      setCompanyData(null);
      setIsCompanyLogin(false);
      setCompanyToken("");
    } finally {
      setCompanyLoading(false);
    }
  };

  const fetchJobsData = async () => {
    setJobLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/job/all-jobs`);
      if (data.success) setJobs(data.jobData || []);
      else toast.error(data.message || "Impossible de récupérer les offres.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Échec de récupération des offres.");
    } finally {
      setJobLoading(false);
    }
  };

  const fetchUserApplication = async () => {
    if (!userToken) return;
    setApplicationsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/get-user-applications`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (data.success) setUserApplication(data.jobApplications || []);
      else {
        toast.error(data.message || "Impossible de récupérer vos candidatures.");
        setUserApplication([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Échec de récupération des candidatures.");
      setUserApplication([]);
    } finally {
      setApplicationsLoading(false);
    }
  };

  // ---------------- UseEffect pour initialisation ----------------
  // Au montage, relire token depuis localStorage et fetch des données
  useEffect(() => {
    if (userToken) {
      setIsLogin(true);
      fetchUserData();
      fetchUserApplication();
    } else {
      setIsLogin(false);
      setUserData(null);
      setUserApplication([]);
    }
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, []);

  useEffect(() => {
    if (companyToken) {
      setIsCompanyLogin(true);
      fetchCompanyData();
    } else {
      setCompanyData(null);
      setIsCompanyLogin(false);
    }
  }, [companyToken]);

  // ---------------- Valeurs du contexte ----------------
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    jobLoading,
    fetchJobsData,
    backendUrl,
    userToken,
    setUserToken,
    userData,
    setUserData,
    userDataLoading,
    isLogin,
    setIsLogin,
    fetchUserData,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    isCompanyLogin,
    setIsCompanyLogin,
    fetchCompanyData,
    companyLoading,
    userApplication,
    applicationsLoading,
    fetchUserApplication,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
