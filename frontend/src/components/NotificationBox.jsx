import React from "react";

const NotificationBox = ({ message }) => {
  return (
    <div className="border p-3 rounded bg-blue-50">
      <p>{message}</p>
    </div>
  );
};

export default NotificationBox;
