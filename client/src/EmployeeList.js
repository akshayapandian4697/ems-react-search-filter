import React from 'react';
import EmployeeFilter from './FilterEmployee';
import EmployeeTable from './EmployeeTable';

import { useLocation } from 'react-router-dom';


const EmployeeDirectory = ({retirement}) => {

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
        width: "100%",
        marginBottom: "30px"
    };

    const tableDiv = {
        width: "90%",
        margin: "auto",
        fontSize: "18px",
        paddingBottom: "20px"
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
    }

    const imgHover = {
        cursor : "pointer"
    }

    const tableStyles = {
        headingStyle,
        tableDiv,
        tableStyle,
        tableHead,
        tableRow,
        titleHeadingStyle,
        imgHover
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

    const searchformstyle = {
        fontSize: "15px",
        width: "50%",
        margin:"auto"
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

    const searchformButton = {
        fontSize: "16px",
        backgroundColor: "#1d92b0",
        padding: "10px",
        color: "#FFFFFF",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none"
    }

    const clearformButton = {
        fontSize: "16px",
        backgroundColor: "#B01d21",
        padding: "10px",
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

    const formStyles = {
        headingStyle,
        formDiv,
        formLableStyle,
        spanstyle,
        formstyle,
        searchformstyle,
        formButton,
        searchformButton,
        clearformButton,
        buttonDiv,
        inputField
    }


    const [allEmployees, setAllEmployees] = React.useState([]);

    const parms = useLocation().search;
    const urlparms = new URLSearchParams (parms);

    let currentstatus = null;
    const title = urlparms.get('title');
    const department = urlparms.get('department');
    const employeetype = urlparms.get('employeetype');
    const currentstatusVar = urlparms.get('currentstatus');

    if(currentstatusVar !== null && currentstatusVar !== ""){
        currentstatus = (currentstatusVar == "1") ? true : false;
    }
    

    let query = `
                query  {
                    employeeList(employeetype: "${employeetype}" , department: "${department}" , title : "${title}" , currentstatus : ${currentstatus} , retirement : ${retirement}) {
                        _id,
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
            let tempList = tempEmployee.data.employeeList;
            setAllEmployees(tempList)
        })
    }


    const deleteEmployee = async (employeeId, empCurrentStatus) => {


        if(empCurrentStatus){
            alert("Can't delete employee!! - Status Active")
        }
        else{
            let query = `mutation DeleteEmployee($id : String) {
                deleteEmployee(id: $id) {
                    id
                }
              }`;
    
            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables: { id: employeeId } })
    
            }).then(async (response) => {
                alert("Employee deleted successfully!")
                fetchingData();
            })
        }

    }

    React.useEffect(function () {
        fetchingData()
    }, [employeetype, department, title, currentstatus, retirement]);


    return (
        <div>

            <div>
                <EmployeeFilter customStyles={formStyles} retirement = {retirement} />
            </div>

            <div>
                <EmployeeTable allEmployees={allEmployees} customStyles={tableStyles} deleteEmployee = {deleteEmployee} retirement = {retirement} />
            </div>

        </div>

    )
}


export default EmployeeDirectory;