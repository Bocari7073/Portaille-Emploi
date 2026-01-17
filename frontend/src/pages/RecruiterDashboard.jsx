// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";

// const RecruiterDashboard = () => {
//   const { backendUrl, companyToken } = useContext(AppContext);
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${backendUrl}/recruiter/candidates`, {
//         headers: { Authorization: `Bearer ${companyToken}` },
//       })
//       .then((res) => setCandidates(res.data.candidates));
//   }, []);

//   return (
//     <div>
//       <h2>Liste des candidats</h2>
//       {candidates.map((c) => (
//         <div key={c._id}>
//           <p>{c.profile?.nom}</p>
//           <a href={`/${c.cv?.path}`} target="_blank">Voir CV</a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecruiterDashboard;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const RecruiterDashboard = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/recruiter/candidates`, {
        headers: { Authorization: `Bearer ${companyToken}` },
      })
      .then(res => setCandidates(res.data.candidates));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">CV des candidats</h2>

      {candidates.map(c => (
        <div key={c._id} className="border p-3 mb-3 rounded">
          <p><b>{c.profile.nom}</b></p>
          <a
            href={`${backendUrl}/${c.cv.path}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            Voir CV
          </a>
        </div>
      ))}
    </div>
  );
};

export default RecruiterDashboard;
