import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from 'moment';
import Button from '@mui/material/Button';



function EmployeeEdit() {

    const navigate = useNavigate(); 

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
        marginBottom : "15px"
    }
    
    const formLableStyle = {
        display: "grid",
        gridTemplateColumns: "25% 70% 5%",
        paddingTop: "15px"
    }
    
    const formstyle = {
        fontSize: "15px"
    }
    
    const buttonDiv = {
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        paddingTop: "25px",
    }
    
    const inputField = {
        fontSize: "16px",
        height: "25px"
    }
    
    const spanstyle = {
        color: "red"
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

    const handleUpdate = async (e) => {

        let errors = [];

        e.preventDefault();

        let formName = document.forms.updateEmployee;

        const singleEmployee = {
            firstname: formName.firstname.value,
            lastname: formName.lastname.value,
            age: parseInt(formName.age.value),
            dateofjoining: new Date((formName.dateofjoining.value).split("/").reverse().join("/")),
            title: formName.title.value,
            department: formName.department.value,
            employeetype: formName.employeetype.value,
            currentstatus: (formName.currentstatus.value === "true") ? true : false,
            id : id
        }
        //await UpdateSingleEmployee(singleEmployee);

        if(isRetiredEmployee(singleEmployee.dateofjoining, singleEmployee.age)){
            errors.push("Can't edit the employee!! Employee is already retired.")
        }

        else if((singleEmployee.employeetype == "Contract" || singleEmployee.employeetype == "Seasonal") && 
                 (singleEmployee.title != "Employee")){
                    errors.push("Contractor / Seasonal Employee can't be Manager / Director / VP")
        }

        if (errors.length == 0) {
            await UpdateSingleEmployee(singleEmployee);
            // e.target.reset();
        }

        else {
            errors.map((err) => (
                alert(err)
            ))
        }

    }

    function isRetiredEmployee(dateofjoining, ageWhenJoins) {

        var todaysDate = new Date();
        var datewhenJoins = new Date(dateofjoining);
      
        datewhenJoins.setFullYear(datewhenJoins.getFullYear() - ageWhenJoins);
        
        var retirementAge = datewhenJoins.setFullYear(datewhenJoins.getFullYear() + 65);
        
        var moment_retirementAge = moment(retirementAge);
        var moment_today = moment(todaysDate);

        var diffDuration = moment.duration(moment_retirementAge.diff(moment_today));
      
        const years = diffDuration.years();
        const months = diffDuration.months();
        const days = diffDuration.days();
      
        if ((years <= 0 && months <= 0 && days <=0)) {
          return true
        }
        return false
      }

    const UpdateSingleEmployee = async (singleEmployee) => {

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
            body: JSON.stringify({ query, variables: { title: singleEmployee.title, department: singleEmployee.department, currentstatus: singleEmployee.currentstatus, id : singleEmployee.id } })

        }).then(async (response) => {
           alert("Employee updated successfully!")
            navigate(`/`);
        })

    }

    const cancelEdit = async (e) => {

        e.preventDefault();
        navigate(`/`);

    }


    return (
        <div>

            <h2 style={ headingStyle}>Edit Employee</h2>

            <div style={ formDiv}>

                <form id="updateEmployee" name="updateEmployee" onSubmit={handleUpdate} style={ formstyle} >
                    <div style={ formLableStyle}>
                        <label for="firstname">First Name:</label>
                        <input type="text" id="firstname" name="firstname" style={ inputField} Value={allEmployees.firstname} readOnly />
                    </div>

                    <div style={ formLableStyle}>
                        <label for="lastname">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" style={ inputField} value={allEmployees.lastname} readOnly />
                    </div>

                    <div style={ formLableStyle}>
                        <label for="age">Age:</label>
                        <input type="number" id="age" name="age" style={ inputField} value={allEmployees.age} readOnly />
                    </div>


                    <div style={ formLableStyle}>
                        <label for="dateofjoining">Date of Joining:</label>
                        <input type="text" id="dateofjoining" name="dateofjoining" style={ inputField} value={new Date(parseInt(allEmployees.dateofjoining)).toLocaleDateString()} readOnly/>
                    </div>


                    <div style={ formLableStyle}>
                        <label for="title">Title:</label>
                        <select name="title" id="title" style={ inputField}>
                            {
                                ["Employee", "Manager", "Director", "VP"].map(function(item){

                                    return (
                                        (item === allEmployees.title) ? (
                                        <option value={allEmployees.title} selected>{allEmployees.title}</option>
                                    ) : (<option value={item}> {item} </option>) 
                                    )

                                }) 
                            }
                            
                            
                        </select>
                        <span style={ spanstyle}>*</span>
                    </div>


                    <div style={ formLableStyle}>
                        <label for="department">Department:</label>
                        <select name="department" id="department" style={ inputField}>
                        {
                                ["IT", "Marketing", "HR", "Engineering"].map(function(item){

                                    return (
                                        (item === allEmployees.department) ? (
                                        <option value={allEmployees.department} selected>{allEmployees.department}</option>
                                    ) : (<option value={item}> {item} </option>) 
                                    )

                                }) 
                            }
                        </select>
                        <span style={ spanstyle}>*</span>
                    </div>

                    <div style={ formLableStyle}>
                        <label for="employeetype">Employee Type:</label>
                        <input type="text" id="employeetype" name="employeetype" style={ inputField} value={allEmployees.employeetype} readOnly/>
                    </div>



                    <div style={ formLableStyle}>
                        <label for="currentstatus">Current status:</label>
                        <select name="currentstatus" id="currentstatus" style={ inputField}>
                        {
                                [true, false].map(function(item){

                                    return (
                                        (item === allEmployees.currentstatus) ? (
                                        <option value={allEmployees.currentstatus} selected>{getCurrentStatus(allEmployees.currentstatus)}</option>
                                    ) : (<option value={item}> {getCurrentStatus(item)} </option>) 
                                    )

                                }) 
                            }
                        </select>
                        
                        <span style={ spanstyle}>*</span>
                    </div>


                    <div style={ buttonDiv}>
                        <Button variant="contained" type="submit">Update Employee</Button>
                    </div>

                    <div style={ buttonDiv}>
                        <Button variant="outlined" onClick={cancelEdit} type="button">Cancel</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}


export default EmployeeEdit;