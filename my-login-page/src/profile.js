<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import axios from 'axios';

=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/profile.css";
>>>>>>> Stashed changes
function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [designation, setDesignation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

<<<<<<< Updated upstream
    axios.get('http://localhost:3001/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
=======
    axios
      .get("http://localhost:3001/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
>>>>>>> Stashed changes
        setEmployeeId(response.data.employee_id);
        setDesignation(response.data.designation);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
<<<<<<< Updated upstream

  return (
    <div>
      <h1>Profile</h1>
      <p>Employee ID: {employeeId}</p>
      <p>Designation: {designation}</p>
    </div>
=======
  const handleDashboardClick = () => {
    window.localStorage.setItem("emp_id",employeeId );
    window.location.href = "/dash";
  };
  const handleLogoutClick = () => {
    window.localStorage.setItem("token", null);
    window.localStorage.setItem("loggedIn", false);
    window.location.href = "/login";
  };

  return (
    <body class="bg-dark text-white">
      <div class="text-center">
        <h1 class="display-5 fw-bold text-body-emphasis">Hello, {name}</h1>
        <p>Employee ID: {employeeId}</p>
        <p>Designation: {designation}</p>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Employee Tracker App is designed to help project managers manage
            their teams of field employees across multiple projects.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              onClick={handleDashboardClick}
              class="btn btn-primary btn-lg px-4 gap-3"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={handleLogoutClick}
              class="btn btn-outline-secondary btn-lg px-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </body>
>>>>>>> Stashed changes
  );
}

export default ProfilePage;
