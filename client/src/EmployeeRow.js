import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

function EmployeeTableRow({ employee, customstyles, StyledTableCell, deleteEmployee, retirement }) {

    let employeeCurrentStatus;
    if (employee.currentstatus) {
        employeeCurrentStatus = 'Working'
    }
    else {
        employeeCurrentStatus = 'Retired'
    }


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    function calculateTimeToRetirement(dateofjoining, ageWhenJoins) {

        var todaysDate = new Date();
        var datewhenJoins = new Date(dateofjoining);

        datewhenJoins.setFullYear(datewhenJoins.getFullYear() - ageWhenJoins);
        
        var retirementAge = datewhenJoins.setFullYear(datewhenJoins.getFullYear() + 65);

        var moment_retirementAge = moment(retirementAge);
        var moment_today = moment(todaysDate);

        var diffDuration = moment.duration(moment_retirementAge.diff(moment_today));

        const retirementYear = diffDuration.years();
        const retirementMonth = diffDuration.months();
        const retirementDays = diffDuration.days();

        if(employee.currentstatus && (retirementDays <0 )){
            updateRetireEmployee();
        }

        return (retirementYear + " Years " + retirementMonth + " Months " + retirementDays + " Days ");

    }
    

    const updateRetireEmployee = async () => {

        let query = `mutation ModifyEmployee($title: String, $department: String, $currentstatus: Boolean, $id : String) {
            modifyEmployee(title: $title, department: $department, currentstatus: $currentstatus, id : $id) {
                title,
                department,
                currentstatus,
                id
            }
          }`

          fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { title: employee.title, department: employee.department, currentstatus: false, id : employee._id } })

        }).then(async (response) => {
        })

    }

    const timeforretirement = calculateTimeToRetirement((new Date(parseInt(employee.dateofjoining)).toLocaleDateString('en-US')), employee.age);

        return (

            <StyledTableRow>
              <StyledTableCell align="center">{employee.id}</StyledTableCell>
              <StyledTableCell align="left">{employee.firstname}</StyledTableCell>
              <StyledTableCell align="left">{employee.lastname}</StyledTableCell>
              <StyledTableCell align="left">{employee.age}</StyledTableCell>
              <StyledTableCell align="left">{new Date(parseInt(employee.dateofjoining)).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="left">{employee.title}</StyledTableCell>
              <StyledTableCell align="left">{employee.department}</StyledTableCell>
              <StyledTableCell align="left">{employee.employeetype}</StyledTableCell>
              <StyledTableCell align="left">{employeeCurrentStatus}</StyledTableCell>
                {(retirement)? <StyledTableCell align="right"> {timeforretirement} </StyledTableCell> : ""}
                {(!retirement)? <StyledTableCell align="right"> <Link to={`/list/${employee._id}`}> <img src={require('./search.png')} title="View details" alt="View details" /> </Link> </StyledTableCell> : ""}
                {(!retirement)? <StyledTableCell align="right"> <Link to={`/edit/${employee._id}`}> <img src={require('./editt.png')} title="Edit" alt="Edit" /> </Link> </StyledTableCell> : ""}
                {(!retirement)? <StyledTableCell align="right"> <img src={require('./delete.png')} onClick={() => deleteEmployee(employee._id, employee.currentstatus)} style={customstyles.imgHover} title="Delete" alt="Delete" /> </StyledTableCell> : ""}
            </StyledTableRow>

        )

    
}

export default EmployeeTableRow;