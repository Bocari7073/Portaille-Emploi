import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import About from "./pages/About";
import Sitemap from "./pages/Sitemap";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import AllJobs from "./pages/AllJobs";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import CandidatesLogin from "./pages/CandidatesLogin";
import CandidatesSignup from "./pages/CandidatesSignup";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import Dashborad from "./pages/Dashborad";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import { AppContext } from "./context/AppContext";
import SignupForm from "./pages/SignupForm";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import RecruiterCandidates from "./pages/RecruiterCandidates";

// Route protégée pour recruteurs
const ProtectedRouteRecruiter = ({ children }) => {
  const { isLogin, userData } = useContext(AppContext);

  if (!isLogin || userData.role !== "recruiter") {
    return <Navigate to="/recruiter-login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AppLayout>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs/:category" element={<AllJobs />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />

        {/* PAGES FIXES */}
        <Route path="/about" element={<About />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />

        {/* CANDIDATE */}
        <Route path="/candidate-login" element={<CandidatesLogin />} />
        <Route path="/candidate-signup" element={<CandidatesSignup />} />
        <Route path="/candidat/profile" element={<Profile />} />

        {/* EXTRA FORM */}
        <Route path="/signup" element={<SignupForm />} />

        {/* RECRUITER */}
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />

        {/* POST JOB */}
        <Route path="/postjob" element={<PostJob />} />

        {/* DASHBOARD (RECRUITER ROUTES) */}
        <Route path="/dashboard" element={<Dashborad />}>
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
           <Route path="recruiter-candidates" element={<RecruiterCandidates />} /> {/* Onglet candidat */}
        </Route>

        {/* ROUTE PROTÉGÉE RECRUITER CANDIDATES */}
        <Route
          path="/recruiter/candidates"
          element={
            <ProtectedRouteRecruiter>
              <RecruiterCandidates />
            </ProtectedRouteRecruiter>
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
