import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const authenticated = localStorage.getItem("authenticated");
  useEffect(() => {
    if (authenticated !== "true") navigate("/");
  }, [authenticated]);
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default Dashboard;
