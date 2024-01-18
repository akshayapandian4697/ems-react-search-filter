import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


function EmployeeCreate() {

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
        borderRadius: "15px"
    }
    
    const formLableStyle = {
        display: "grid",
        gridTemplateColumns: "25% 70% 5%",
        paddingTop: "15px"
    }
    
    const formstyle = {
        fontSize: "15px"
    }
    
    const formButton = {
        fontSize: "18px",
        backgroundColor: "#0074b3",
        padding: "15px",
        color: "#FFFFFF",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none"
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


 
    const createEmployee = async (e) => {

        let errors = [];

        e.preventDefault();

        let formName = document.forms.addEmployee;

        const singleEmployee = {
            firstname: formName.firstname.value,
            lastname: formName.lastname.value,
            age: parseInt(formName.age.value),
            dateofjoining: new Date(formName.dateofjoining.value),
            title: formName.title.value,
            department: formName.department.value,
            employeetype: formName.employeetype.value
        }

        if (singleEmployee.firstname == "" || singleEmployee.lastname == "" || singleEmployee.age == "" || singleEmployee.dateofjoining == "" || singleEmployee.title == "" || singleEmployee.department == "" || singleEmployee.employeetype == "") {
            errors.push("Please fill all the required fields")
        }
        else if (parseInt(singleEmployee.age) < 20 || parseInt(singleEmployee.age) > 70) {
            errors.push("Age should be within 20 and 70")
        }
        else if(singleEmployee.dateofjoining > new Date() ){
            errors.push("Date of joining should not be a future date")
        }
        else if((singleEmployee.employeetype == "Contract" || singleEmployee.employeetype == "Seasonal") && 
                 (singleEmployee.title != "Employee")){
                    errors.push("Contractor / Seasonal Employee can't be Manager / Director / VP")
        }

        if (errors.length == 0) {
            await AddSingleEmployee(singleEmployee);
            e.target.reset();
        }

        else {
            errors.map((err) => (
                alert(err)
            ))
        }

    }


    const AddSingleEmployee = async (singleEmployee) => {

        let query = `mutation AddNewEmployee($firstname: String!, $lastname: String!, $age: Int!, $dateofjoining: String, $title: String, $department: String, $employeetype: String) {
            addNewEmployee(firstname: $firstname, lastname: $lastname, age: $age, dateofjoining: $dateofjoining, title: $title, department: $department, employeetype: $employeetype) {
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
          }`


          fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { firstname: singleEmployee.firstname, lastname: singleEmployee.lastname, age: singleEmployee.age, dateofjoining: singleEmployee.dateofjoining, title: singleEmployee.title, department: singleEmployee.department, employeetype: singleEmployee.employeetype } })

        }).then(async (response) => {
           alert("Employee added successfully!")
            navigate(`/`);
        })


    }

    const cancelAdd = async (e) => {

        e.preventDefault();
        navigate(`/`);

    }
    
    
    return (

        <Box component="form" id="addEmployee" name="addEmployee" onSubmit={createEmployee} sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' }, }}  noValidate autoComplete="off" >

        <div>
            <h2 style={ headingStyle}>Create Employee</h2>

            <div style={ formDiv}>

                <TextField required id="firstname" type="text" label="First Name" name="firstname"  /> <br/>
                    
                    <TextField required id="lastname" type="text" label="Last Name" name="lastname"  /> <br/>

                    <TextField required id="age" type="number" label="Age" name="age"  /> <br/>

                    <TextField required id="dateofjoining" type="date" helperText="Date of Joining" name="dateofjoining"  /> <br/>

                    <TextField required id="title" name="title" select label="Title" defaultValue="" helperText="Please select employee title" >
                        <MenuItem value="Employee">Employee</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Director">Director</MenuItem>
                        <MenuItem value="VP">VP</MenuItem>
                    </TextField>

                    <TextField required id="department" name="department" select label="Department" defaultValue="" helperText="Please select employee department" >
                        <MenuItem value="IT">IT</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                    </TextField>

                    <TextField required id="employeetype" name="employeetype" select label="Employee type" defaultValue="" helperText="Please select employee type" >
                        <MenuItem value="Full time">Full time</MenuItem>
                        <MenuItem value="Part time">Part time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                        <MenuItem value="Seasonal">Seasonal</MenuItem>
                    </TextField>


                    <div style={ buttonDiv}>
                        <Button variant="contained" type="submit" >Create Employee</Button>
                    </div>

                    <div style={ buttonDiv}>
                        <Button variant="outlined" onClick={cancelAdd} type="button">Cancel</Button>
                    </div>

            </div>


        </div>
        </Box>
    )

}

export default EmployeeCreate;