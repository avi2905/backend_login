import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";


  function createData(date, employeeId, inTime, outTime) {
    return { date, employeeId, inTime, outTime };
  }

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [data, setData] = useState([]);
  const eid = localStorage.getItem("emp_id");
  useEffect(() => {
    axios
      .post("http://localhost:3000/attendance",{emp_id:'eid'})
      .then((response) => {
        const newData = response.data.map((row) =>
          createData(
            row.date,
            row.employee_id,
            row.check_in_time,
            row.check_out_time
          )
        );
        setData(newData);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <React.Fragment>
      <Title>Attendance</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Emp ID</TableCell>
            <TableCell>In Time</TableCell>
            <TableCell>Out Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.employeeId}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.employeeId}</TableCell>
              <TableCell>{row.inTime}</TableCell>
              <TableCell>{row.outTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
