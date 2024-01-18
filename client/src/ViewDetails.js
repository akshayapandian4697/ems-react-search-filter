import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  MenuItem from '@mui/material/MenuItem';


function ViewDetails() {

    const headingStyle = {
        color: "#0074b3",
        fontSize: "30px",
        textAlign: "center"
    }
    
    const formDiv = {
        margin: "auto",
        width: "50%",
        fontSize: "20px",
        backgroundColor: "#ccefff",
        padding: "30px",
        borderRadius: "15px",
        marginBottom : "15px",
        color: "black"
    }
   

    const [allEmployees, setAllEmployees] = React.useState([]);

    const {id} = useParams();

    let query = `
                query  {
                    getEmployee(id: "${id}") {
                        _id
                        id
                        firstname
                        lastname
                        age
                        dateofjoining
                        title
                        department
                        employeetype
                        currentstatus
                    }
                }
                `;

                function fetchingData() {

                    fetch('http://localhost:4000/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query })
                    }).then(async (response) => {
                        let tempEmployee = await response.json();
                        let tempList = tempEmployee.data.getEmployee;
                        setAllEmployees(tempList);
                    })
                }


    useEffect(function () {
        fetchingData()
    }, []);


    const getCurrentStatus = (currentstatusVal) => {
       return (currentstatusVal) ? "Working" : "Retired";
    }

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

        return (retirementYear + " Years " + retirementMonth + " Months " + retirementDays + " Days ");

    }

    return (

        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' }, }}  noValidate autoComplete="off" >

        <div>
            <h2 style={ headingStyle}>Employee Details</h2>

            <div style={ formDiv}>

                <TextField  id="firstname" type="text" name="firstname" value={allEmployees.firstname} helperText="First Name" /> <br/>
                    
                    <TextField  id="lastname" type="text" helperText="Last Name" name="lastname" value={allEmployees.lastname} /> <br/>

                    <TextField  id="age" type="number" helperText="Age" name="age" value={allEmployees.age} /> <br/>

                    <TextField  id="dateofjoining" type="text" helperText="Date of Joining" name="dateofjoining" value={new Date(parseInt(allEmployees.dateofjoining)).toLocaleDateString()} /> <br/>

                    <TextField  id="title" type="text" helperText="Title" name="title" value={allEmployees.title} /> <br/>

                    <TextField  id="department" type="text" helperText="Department" name="department" value={allEmployees.department} /> <br/>

                    <TextField  id="employeetype" type="text" helperText="Employee Type" name="employeetype" value={allEmployees.employeetype} /> <br/>

                    <TextField  id="currentstatus" type="text" helperText="Employee Status" name="currentstatus" value={getCurrentStatus(allEmployees.currentstatus)} /> <br/>

                    <TextField  id="timeforretirement" type="text" helperText="Time for Retirement" name="timeforretirement" value={calculateTimeToRetirement((new Date(parseInt(allEmployees.dateofjoining)).toLocaleDateString('en-US')), allEmployees.age)} /> <br/>

            </div>

        </div>
        </Box>

    )
}


export default ViewDetails;