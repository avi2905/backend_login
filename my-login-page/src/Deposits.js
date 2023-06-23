import React,{useState,useEffect}  from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios
      .get("http://localhost:3001/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setEmployeeId(response.data.employee_id);
        setDesignation(response.data.designation);
        setName(response.data.name);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <React.Fragment>
      <Title>{name} </Title>
      <Typography component="p" variant="h6" sx={{ marginTop: '16px' }}>
      {designation}
      </Typography>
      <Typography color="text.secondary" variant="h6" sx={{ flex: 1, marginTop:'16px'}}>
      emp id:{employeeId}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}