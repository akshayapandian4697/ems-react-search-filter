
import React from 'react'
import { useNavigate } from 'react-router-dom';

function EmployeeFilter({ customStyles, retirement }) {

    const navigate = useNavigate(); 

    const filterEmployee = async (e) => {

        e.preventDefault();

        let formName = document.forms.filterEmployees;
        let filterDepartment;
        let filterEmployeetype;
        let filterRole;
        let filterCurrentstatus;

        filterCurrentstatus = (!retirement) ? formName.employeestatus.value : "";

        const singleEmployee = {
            filterRole: formName.title.value,
            filterDepartment: formName.department.value,
            filterEmployeetype: formName.employeetype.value,
            filterCurrentstatus: filterCurrentstatus
        }

        filterDepartment = singleEmployee.filterDepartment;
        filterEmployeetype = singleEmployee.filterEmployeetype;
        filterRole = singleEmployee.filterRole;
        filterCurrentstatus = singleEmployee.filterCurrentstatus;

        
        let path;
        if(retirement){
            path = `/retirement/?employeetype=${filterEmployeetype}&department=${filterDepartment}&title=${filterRole}`; 
        }
        else{
            path = `/list/?employeetype=${filterEmployeetype}&department=${filterDepartment}&title=${filterRole}&currentstatus=${filterCurrentstatus}`; 
        }
        
        navigate(path);

    }

    const clearSearch = async (e) => {

        e.preventDefault();

        let formName = document.forms.filterEmployees;
        formName.title.value = "";
        formName.department.value = "";
        formName.employeetype.value = "";
        if(!retirement){
            formName.employeestatus.value = "";
        }
        
        (retirement) ? navigate(`/retirement`) : navigate(`/`);

    }

    return (
        <div>
            <div>

                <form id="filterEmployees" name="addEmployee" onSubmit={filterEmployee} style={customStyles.searchformstyle} >
                    
                    <div style={customStyles.formLableStyle}>
                        <label for="title">Title:</label>
                        <select name="title" id="title" style={customStyles.inputField}>
                            <option value="">Select Employee Title</option>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>


                    <div style={customStyles.formLableStyle}>
                        <label for="department">Department:</label>
                        <select name="department" id="department" style={customStyles.inputField}>
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>

                    <div style={customStyles.formLableStyle}>
                        <label for="employeetype">Employee Type:</label>
                        <select name="employeetype" id="employeetype" style={customStyles.inputField}>
                            <option value="">Select Employee Type</option>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part  time</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>

                    {!retirement ? 
                    <div style={customStyles.formLableStyle}>
                        <label for="employeestatus">Employee Status:</label>
                        <select name="employeestatus" id="employeestatus" style={customStyles.inputField}>
                            <option value="">Select Employee Status</option>
                            <option value="1">Working</option>
                            <option value="0">Retired</option>
                        </select>
                    </div>
                    : ""}

                    <div style={customStyles.buttonDiv}>
                        <button type="submit" style={customStyles.searchformButton}>Search Employee</button>
                    </div>

                    <div style={customStyles.buttonDiv}>
                        <button type="clear" onClick={clearSearch} style={customStyles.clearformButton}>Clear filter</button>
                    </div>
                    
                </form>
            </div>

        </div>
    )
}

export default EmployeeFilter;