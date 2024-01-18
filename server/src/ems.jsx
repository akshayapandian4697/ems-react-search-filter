
// function Greeting({ customstyle }) {
//     return (
//         <div>
//             <h2 style={customstyle}>Welcome to Employee Management System</h2>
//         </div>
//     )
// }


// function EmployeeTableRow({ employee, customstyles }) {

//     let employeeCurrentStatus;
//     if (employee.currentstatus) {
//         employeeCurrentStatus = 'Working'
//     }
//     else {
//         employeeCurrentStatus = 'Retired'
//     }

//     return (
//         <tr style={customstyles}>
//             <td > {employee.id} </td>
//             <td > {employee.firstname} </td>
//             <td > {employee.lastname} </td>
//             <td > {employee.age} </td>
//             <td > {new Date(parseInt(employee.dateofjoining)).toLocaleDateString()} </td>
//             <td > {employee.title} </td>
//             <td > {employee.department} </td>
//             <td > {employee.employeetype} </td>
//             <td > {employeeCurrentStatus} </td>
//         </tr>
//     )

// }



// function EmployeeTable({ allEmployees, customStyles }) {

//     const allEmployeeRows = allEmployees.map((emp) => (
//         <EmployeeTableRow employee={emp} customstyles={customStyles.tableRow} />
//     ));

//     return (
//         <div>
//             <h2 style={customStyles.headingStyle}>Employee Directory</h2>

//             <div style={customStyles.tableDiv}>
//                 <table style={customStyles.tableStyle}>
//                     <thead >
//                         <tr>
//                             <th style={customStyles.tableHead}> ID </th>
//                             <th style={customStyles.tableHead}> FIRST NAME </th>
//                             <th style={customStyles.tableHead}> LAST NAME </th>
//                             <th style={customStyles.tableHead}> AGE </th>
//                             <th style={customStyles.tableHead}> DATE OF JOINING </th>
//                             <th style={customStyles.tableHead}> TITLE </th>
//                             <th style={customStyles.tableHead}> DEPARTMENT </th>
//                             <th style={customStyles.tableHead}> EMPLOYEE TYPE </th>
//                             <th style={customStyles.tableHead}> CURRENT STATUS </th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         {allEmployeeRows}

//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )

// }


// function EmployeeCreate({ AddSingleEmployee, customStyles }) {

//     const createEmployee = async (e) => {

//         let errors = [];

//         e.preventDefault();

//         let formName = document.forms.addEmployee;

//         const singleEmployee = {
//             firstname: formName.firstname.value,
//             lastname: formName.lastname.value,
//             age: parseInt(formName.age.value),
//             dateofjoining: new Date(formName.dateofjoining.value),
//             title: formName.title.value,
//             department: formName.department.value,
//             employeetype: formName.employeetype.value
//         }

//         if (firstname.value == "" || lastname.value == "" || age.value == "" || dateofjoining.value == "" || title.value == "" || department.value == "" || employeetype.value == "") {
//             errors.push("Please fill all the required fields")
//         }
//         else if (parseInt(age.value) < 20 || parseInt(age.value) > 70) {
//             errors.push("Age should be within 20 and 70")
//         }
//         else if(new Date(formName.dateofjoining.value) > new Date() ){
//             errors.push("Date of joining should not be a future date")
//         }

//         if (errors.length == 0) {
//             await AddSingleEmployee(singleEmployee);
//             e.target.reset();
//         }

//         else {
//             errors.map((err) => (
//                 alert(err)
//             ))
//         }

//     }

    
//     return (
//         <div>
//             <h2 style={customStyles.headingStyle}>Create Employee</h2>

//             <div style={customStyles.formDiv}>

//                 <form id="addEmployee" name="addEmployee" onSubmit={createEmployee} style={customStyles.formStyle} >
//                     <div style={customStyles.formLableStyle}>
//                         <label for="firstname">First Name:</label>
//                         <input type="text" id="firstname" name="firstname" style={customStyles.inputField} />
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>

//                     <div style={customStyles.formLableStyle}>
//                         <label for="lastname">Last Name:</label>
//                         <input type="text" id="lastname" name="lastname" style={customStyles.inputField} />
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>

//                     <div style={customStyles.formLableStyle}>
//                         <label for="age">Age:</label>
//                         <input type="number" id="age" name="age" style={customStyles.inputField} />
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>


//                     <div style={customStyles.formLableStyle}>
//                         <label for="dateofjoining">Date of Joining:</label>
//                         <input type="date" id="dateofjoining" name="dateofjoining" style={customStyles.inputField} />
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>


//                     <div style={customStyles.formLableStyle}>
//                         <label for="title">Title:</label>
//                         <select name="title" id="title" style={customStyles.inputField}>
//                             <option value="">Select Employee Title</option>
//                             <option value="Employee">Employee</option>
//                             <option value="Manager">Manager</option>
//                             <option value="Director">Director</option>
//                             <option value="VP">VP</option>
//                         </select>
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>


//                     <div style={customStyles.formLableStyle}>
//                         <label for="department">Department:</label>
//                         <select name="department" id="department" style={customStyles.inputField}>
//                             <option value="">Select Department</option>
//                             <option value="IT">IT</option>
//                             <option value="Marketing">Marketing</option>
//                             <option value="HR">HR</option>
//                             <option value="Engineering">Engineering</option>
//                         </select>
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>

//                     <div style={customStyles.formLableStyle}>
//                         <label for="employeetype">Employee Type:</label>
//                         <select name="employeetype" id="employeetype" style={customStyles.inputField}>
//                             <option value="">Select Employee Type</option>
//                             <option value="Full time">Full time</option>
//                             <option value="Part time">Part  time</option>
//                             <option value="Contract">Contract</option>
//                             <option value="Seasonal">Seasonal</option>
//                         </select>
//                         <span style={customStyles.spanstyle}>*</span>
//                     </div>


//                     <div style={customStyles.buttonDiv}>
//                         <button type="submit" style={customStyles.formButton}>Create Employee</button>
//                     </div>

//                 </form>
//             </div>


//         </div>
//     )

// }



// const EmployeeDirectory = () => {

//     const titleHeadingStyle = {
//         color: "#e6f6ff",
//         fontSize: "40px",
//         textAlign: "center",
//         backgroundColor: "#005380",
//         paddingTop: "20px",
//         paddingBottom: "20px"
//     };

//     const headingStyle = {
//         color: "#0074b3",
//         fontSize: "30px",
//         textAlign: "center"
//     };

//     const tableStyle = {
//         border: "2px solid #0074b3",
//         width: "100%"
//     };

//     const tableDiv = {
//         width: "90%",
//         margin: "auto",
//         fontSize: "18px"
//     };

//     const tableHead = {
//         border: "1px solid #e6f6ff",
//         padding: "8px",
//         paddingTop: "12px",
//         paddingBottom: "12px",
//         textAlign: "left",
//         backgroundColor: "#0074b3",
//         color: "white"
//     };

//     const tableRow = {
//         border: "1px solid #b3e3ff",
//         borderCollapse: "collapse",
//         padding: "18px",
//         backgroundColor: "#FFFFFF"
//     }

//     const tableStyles = {
//         headingStyle,
//         tableDiv,
//         tableStyle,
//         tableHead,
//         tableRow,
//         titleHeadingStyle
//     }

//     const formDiv = {
//         margin: "auto",
//         width: "50%",
//         fontSize: "20px",
//         backgroundColor: "#ccefff",
//         padding: "30px",
//         borderRadius: "15px"
//     }

//     const formLableStyle = {
//         display: "grid",
//         gridTemplateColumns: "25% 70% 5%",
//         paddingTop: "15px"
//     }

//     const formstyle = {
//         fontSize: "15px"
//     }

//     const formButton = {
//         fontSize: "18px",
//         backgroundColor: "#0074b3",
//         padding: "15px",
//         color: "#FFFFFF",
//         borderRadius: "8px",
//         cursor: "pointer",
//         border: "none"
//     }

//     const buttonDiv = {
//         display: "flex",
//         justifyContent: "center",
//         margin: "auto",
//         paddingTop: "25px",
//     }

//     const inputField = {
//         fontSize: "16px",
//         height: "25px"
//     }

//     const spanstyle = {
//         color: "red"
//     }

//     const formStyles = {
//         headingStyle,
//         formDiv,
//         formLableStyle,
//         spanstyle,
//         formstyle,
//         formButton,
//         buttonDiv,
//         inputField
//     }


//     const [allEmployees, setAllEmployees] = React.useState([]);

//     let query = `
//                 query  {
//                     employeeList {
//                         id
//                         firstname
//                         lastname
//                         age
//                         dateofjoining
//                         title
//                         department
//                         employeetype
//                         currentstatus
//                     }
//               }
//             `;



//     function fetchingData() {

//         fetch('/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query })
//         }).then(async (response) => {
//             let tempEmployee = await response.json();
//             let tempList = tempEmployee.data.employeeList;
//             setAllEmployees(tempList)
//         })
//     }


//     React.useEffect(function () {
//         fetchingData()
//     }, []);



//     const AddSingleEmployee = async (singleEmployee) => {

//         let query = `mutation AddNewEmployee($firstname: String!, $lastname: String!, $age: Int!, $dateofjoining: String, $title: String, $department: String, $employeetype: String) {
//             addNewEmployee(firstname: $firstname, lastname: $lastname, age: $age, dateofjoining: $dateofjoining, title: $title, department: $department, employeetype: $employeetype) {
//               id
//               firstname
//               lastname
//               age
//               dateofjoining
//               title
//               department
//               employeetype
//               currentstatus
//             }
//           }`


//         fetch('/graphql', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query, variables: { firstname: singleEmployee.firstname, lastname: singleEmployee.lastname, age: singleEmployee.age, dateofjoining: singleEmployee.dateofjoining, title: singleEmployee.title, department: singleEmployee.department, employeetype: singleEmployee.employeetype } })

//         }).then(async (response) => {

//             fetchingData()

//         })


//     }

//     return (
//         <div>
//             <div>
//                 <Greeting customstyle={titleHeadingStyle} />
//             </div>

//             <div>
//                 <EmployeeTable allEmployees={allEmployees} customStyles={tableStyles} />
//             </div>

//             <div>

//                 <EmployeeCreate AddSingleEmployee={AddSingleEmployee} customStyles={formStyles} />
//             </div>

//         </div>

//     )
// }


// const element = ReactDOM.createRoot(document.getElementById("root-1"));

// element.render(<EmployeeDirectory />);