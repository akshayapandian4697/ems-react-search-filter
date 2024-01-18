function Greeting({
  customstyle
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: customstyle
  }, "Welcome to Employee Management System"));
}
function EmployeeTableRow({
  employee,
  customstyles
}) {
  let employeeCurrentStatus;
  if (employee.currentstatus) {
    employeeCurrentStatus = 'Working';
  } else {
    employeeCurrentStatus = 'Retired';
  }
  return /*#__PURE__*/React.createElement("tr", {
    style: customstyles
  }, /*#__PURE__*/React.createElement("td", null, " ", employee.id, " "), /*#__PURE__*/React.createElement("td", null, " ", employee.firstname, " "), /*#__PURE__*/React.createElement("td", null, " ", employee.lastname, " "), /*#__PURE__*/React.createElement("td", null, " ", employee.age, " "), /*#__PURE__*/React.createElement("td", null, " ", new Date(parseInt(employee.dateofjoining)).toLocaleDateString(), " "), /*#__PURE__*/React.createElement("td", null, " ", employee.title, " "), /*#__PURE__*/React.createElement("td", null, " ", employee.department, " "), /*#__PURE__*/React.createElement("td", null, " ", employee.employeetype, " "), /*#__PURE__*/React.createElement("td", null, " ", employeeCurrentStatus, " "));
}
function EmployeeTable({
  allEmployees,
  customStyles
}) {
  const allEmployeeRows = allEmployees.map(emp => /*#__PURE__*/React.createElement(EmployeeTableRow, {
    employee: emp,
    customstyles: customStyles.tableRow
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: customStyles.headingStyle
  }, "Employee Directory"), /*#__PURE__*/React.createElement("div", {
    style: customStyles.tableDiv
  }, /*#__PURE__*/React.createElement("table", {
    style: customStyles.tableStyle
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " ID "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " FIRST NAME "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " LAST NAME "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " AGE "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " DATE OF JOINING "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " TITLE "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " DEPARTMENT "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " EMPLOYEE TYPE "), /*#__PURE__*/React.createElement("th", {
    style: customStyles.tableHead
  }, " CURRENT STATUS "))), /*#__PURE__*/React.createElement("tbody", null, allEmployeeRows))));
}
function EmployeeCreate({
  AddSingleEmployee,
  customStyles
}) {
  const createEmployee = async e => {
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
    };
    if (firstname.value == "" || lastname.value == "" || age.value == "" || dateofjoining.value == "" || title.value == "" || department.value == "" || employeetype.value == "") {
      errors.push("Please fill all the required fields");
    } else if (parseInt(age.value) < 20 || parseInt(age.value) > 70) {
      errors.push("Age should be within 20 and 70");
    } else if (new Date(formName.dateofjoining.value) > new Date()) {
      errors.push("Date of joining should not be a future date");
    }
    if (errors.length == 0) {
      await AddSingleEmployee(singleEmployee);
      e.target.reset();
    } else {
      errors.map(err => alert(err));
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: customStyles.headingStyle
  }, "Create Employee"), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formDiv
  }, /*#__PURE__*/React.createElement("form", {
    id: "addEmployee",
    name: "addEmployee",
    onSubmit: createEmployee,
    style: customStyles.formStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "firstname"
  }, "First Name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "firstname",
    name: "firstname",
    style: customStyles.inputField
  }), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "lastname"
  }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "lastname",
    name: "lastname",
    style: customStyles.inputField
  }), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "age"
  }, "Age:"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "age",
    name: "age",
    style: customStyles.inputField
  }), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "dateofjoining"
  }, "Date of Joining:"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    id: "dateofjoining",
    name: "dateofjoining",
    style: customStyles.inputField
  }), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "title"
  }, "Title:"), /*#__PURE__*/React.createElement("select", {
    name: "title",
    id: "title",
    style: customStyles.inputField
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Employee Title"), /*#__PURE__*/React.createElement("option", {
    value: "Employee"
  }, "Employee"), /*#__PURE__*/React.createElement("option", {
    value: "Manager"
  }, "Manager"), /*#__PURE__*/React.createElement("option", {
    value: "Director"
  }, "Director"), /*#__PURE__*/React.createElement("option", {
    value: "VP"
  }, "VP")), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "department"
  }, "Department:"), /*#__PURE__*/React.createElement("select", {
    name: "department",
    id: "department",
    style: customStyles.inputField
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Department"), /*#__PURE__*/React.createElement("option", {
    value: "IT"
  }, "IT"), /*#__PURE__*/React.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "HR"
  }, "HR"), /*#__PURE__*/React.createElement("option", {
    value: "Engineering"
  }, "Engineering")), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.formLableStyle
  }, /*#__PURE__*/React.createElement("label", {
    for: "employeetype"
  }, "Employee Type:"), /*#__PURE__*/React.createElement("select", {
    name: "employeetype",
    id: "employeetype",
    style: customStyles.inputField
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Employee Type"), /*#__PURE__*/React.createElement("option", {
    value: "Full time"
  }, "Full time"), /*#__PURE__*/React.createElement("option", {
    value: "Part time"
  }, "Part  time"), /*#__PURE__*/React.createElement("option", {
    value: "Contract"
  }, "Contract"), /*#__PURE__*/React.createElement("option", {
    value: "Seasonal"
  }, "Seasonal")), /*#__PURE__*/React.createElement("span", {
    style: customStyles.spanstyle
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: customStyles.buttonDiv
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: customStyles.formButton
  }, "Create Employee")))));
}
const EmployeeDirectory = () => {
  const titleHeadingStyle = {
    color: "#e6f6ff",
    fontSize: "40px",
    textAlign: "center",
    backgroundColor: "#005380",
    paddingTop: "20px",
    paddingBottom: "20px"
  };
  const headingStyle = {
    color: "#0074b3",
    fontSize: "30px",
    textAlign: "center"
  };
  const tableStyle = {
    border: "2px solid #0074b3",
    width: "100%"
  };
  const tableDiv = {
    width: "90%",
    margin: "auto",
    fontSize: "18px"
  };
  const tableHead = {
    border: "1px solid #e6f6ff",
    padding: "8px",
    paddingTop: "12px",
    paddingBottom: "12px",
    textAlign: "left",
    backgroundColor: "#0074b3",
    color: "white"
  };
  const tableRow = {
    border: "1px solid #b3e3ff",
    borderCollapse: "collapse",
    padding: "18px",
    backgroundColor: "#FFFFFF"
  };
  const tableStyles = {
    headingStyle,
    tableDiv,
    tableStyle,
    tableHead,
    tableRow,
    titleHeadingStyle
  };
  const formDiv = {
    margin: "auto",
    width: "50%",
    fontSize: "20px",
    backgroundColor: "#ccefff",
    padding: "30px",
    borderRadius: "15px"
  };
  const formLableStyle = {
    display: "grid",
    gridTemplateColumns: "25% 70% 5%",
    paddingTop: "15px"
  };
  const formstyle = {
    fontSize: "15px"
  };
  const formButton = {
    fontSize: "18px",
    backgroundColor: "#0074b3",
    padding: "15px",
    color: "#FFFFFF",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none"
  };
  const buttonDiv = {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    paddingTop: "25px"
  };
  const inputField = {
    fontSize: "16px",
    height: "25px"
  };
  const spanstyle = {
    color: "red"
  };
  const formStyles = {
    headingStyle,
    formDiv,
    formLableStyle,
    spanstyle,
    formstyle,
    formButton,
    buttonDiv,
    inputField
  };
  const [allEmployees, setAllEmployees] = React.useState([]);
  let query = `
                query  {
                    employeeList {
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
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let tempEmployee = await response.json();
      let tempList = tempEmployee.data.employeeList;
      setAllEmployees(tempList);
    });
  }
  React.useEffect(function () {
    fetchingData();
  }, []);
  const AddSingleEmployee = async singleEmployee => {
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
          }`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          firstname: singleEmployee.firstname,
          lastname: singleEmployee.lastname,
          age: singleEmployee.age,
          dateofjoining: singleEmployee.dateofjoining,
          title: singleEmployee.title,
          department: singleEmployee.department,
          employeetype: singleEmployee.employeetype
        }
      })
    }).then(async response => {
      fetchingData();
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Greeting, {
    customstyle: titleHeadingStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeTable, {
    allEmployees: allEmployees,
    customStyles: tableStyles
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeCreate, {
    AddSingleEmployee: AddSingleEmployee,
    customStyles: formStyles
  })));
};
const element = ReactDOM.createRoot(document.getElementById("root-1"));
element.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null));