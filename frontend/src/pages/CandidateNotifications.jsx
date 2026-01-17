// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import NotificationBox from "../components/NotificationBox";

// const CandidateNotifications = () => {
//   const { backendUrl, userToken } = useContext(AppContext);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${backendUrl}/notification/user`, {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
//       .then((res) => setNotifications(res.data.notifications));
//   }, []);

//   return (
//     <div>
//       <h2>Mes notifications</h2>
//       {notifications.map((n) => (
//         <NotificationBox key={n._id} message={n.message} />
//       ))}
//     </div>
//   );
// };

// export default CandidateNotifications;
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const CandidateNotifications = () => {
  const { backendUrl, userToken } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/notifications/candidate`, {
      headers: { Authorization: `Bearer ${userToken}` },
    }).then(res => setNotifications(res.data.notifications));
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold mb-3">Notifications</h2>
      {notifications.map(n => (
        <div key={n._id} className="border p-2 mb-2">
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default CandidateNotifications;
