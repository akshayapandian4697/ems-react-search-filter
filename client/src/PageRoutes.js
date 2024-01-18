import React from 'react'
import { Route, Routes } from "react-router-dom";
import EditEmployee from './EditEmployee';
import EmployeeFilter from "./FilterEmployee";
import EmployeeList from "./EmployeeList";
import AddEmployee from './AddEmployee';
import ViewDetails from './ViewDetails';


function PageRoutes() {
    return(
       <Routes>
            <Route path='/' element={<EmployeeList retirement = {false} />} />
            <Route path='/filter' element={<EmployeeFilter />} />
            <Route path='/list' element={<EmployeeList retirement = {false} />} />
            <Route path='/edit/:id' element={<EditEmployee />} />
            <Route path='/create' element={<AddEmployee />} />
            <Route path='/list/:id' element={<ViewDetails />} />
            <Route path='/retirement' element={<EmployeeList retirement = {true} />} />
       </Routes>
        
    )
}

export default PageRoutes;