import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [designation, setDesignation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }

    axios.get('http://localhost:3001/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setEmployeeId(response.data.employee_id);
        setDesignation(response.data.designation);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Employee ID: {employeeId}</p>
      <p>Designation: {designation}</p>
    </div>
  );
}

export default ProfilePage;
