// import React, { useContext, useEffect, useState } from "react";
// import moment from "moment";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import Loader from "../components/Loader";
// import { toast } from "react-hot-toast";

// const ManageJobs = () => {
//   const [manageJobData, setManageJobData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { backendUrl, companyToken } = useContext(AppContext);

//   const fetchManageJobsData = async () => {
//     if (!companyToken) {
//       toast.error("Vous devez être connecté pour voir vos offres.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         `${backendUrl}/company/company/posted-jobs`,
//         {
//           headers: {
//             token: companyToken,
//           },
//         }
//       );

//       if (data.success) {
//         setManageJobData(data.jobData || []);
//       } else {
//         toast.error(data.message || "Impossible de charger les emplois.");
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Session expirée. Veuillez vous reconnecter.");
//       } else if (error.response?.status === 403) {
//         toast.error("Accès refusé.");
//       } else {
//         toast.error(error?.response?.data?.message || "Erreur inconnue.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changeJobVisiblity = async (id) => {
//     if (!companyToken) {
//       toast.error("Vous devez être connecté.");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/company/change-visiblity`,
//         { id },
//         {
//           headers: { token: companyToken },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         fetchManageJobsData(); // rafraîchit la liste
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Erreur inconnue.");
//     }
//   };

//   useEffect(() => {
//     fetchManageJobsData();
//   }, [companyToken]); // ⚡ recharge si le token change

//   useEffect(() => {
//     document.title = "DHCOM | Tableau de bord";
//   }, []);

//   return (
//     <section>
//       {loading ? (
//         <div className="flex items-center justify-center h-[70vh]">
//           <Loader />
//         </div>
//       ) : !manageJobData.length ? (
//         <div className="p-4 text-center text-gray-500">Aucun emploi trouvé.</div>
//       ) : (
//         <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
//           <table className="w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre d'emploi</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emplacement</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat(es)</th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visible</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {manageJobData.slice().reverse().map((job, index) => (
//                 <tr key={job._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{job.title}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{moment(job.date).format("ll")}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
//                     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-medium">{job.applicants || 0}</span>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
//                     <input
//                       onChange={() => changeJobVisiblity(job._id)}
//                       type="checkbox"
//                       checked={job.visible}
//                       className="cursor-pointer"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ManageJobs;


import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const ManageJobs = () => {
  const [manageJobData, setManageJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchManageJobsData = async () => {
    if (!companyToken) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/company/company/posted-jobs`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      });
      if (data.success) setManageJobData(data.jobData || []);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Quelque chose s'est mal passé");
    } finally {
      setLoading(false);
    }
  };

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-visiblity`,
        { id },
        { headers: { Authorization: `Bearer ${companyToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchManageJobsData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchManageJobsData();
  }, [companyToken]);

  useEffect(() => {
    document.title = "DHCOM | Tableau de bord";
  }, []);

  return (
    <section>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader />
        </div>
      ) : manageJobData.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Aucun emploi trouvé.</div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre d'emploi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emplacement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat(es)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {manageJobData.slice().reverse().map((job, index) => (
                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{job.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{moment(job.date).format("ll")}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-medium">
                      {job.applicants || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <input
                      type="checkbox"
                      checked={job.visible}
                      onChange={() => changeJobVisibility(job._id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageJobs;
