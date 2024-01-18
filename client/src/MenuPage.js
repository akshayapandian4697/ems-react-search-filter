import React from 'react'
import { Link, BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";

function EmployeeMenu() {

    const titleHeadingStyle = {
        color: "#e6f6ff",
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
        fontSize: "40px",
        textAlign: "center",
        backgroundColor: "#022538",
        paddingTop: "25px",
        paddingBottom: "25px",
        marginTop: "0px",
        marginBottom : "0px"
    };


    const nav = {
        backgroundColor: "#1d1c1c",
        padding: "10px 0px 10px 0px"
    }

    const nav_ul = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        justifyContent: "space - around",
        listStyle: "none",
        width: "60%",
        margin: "auto"
        }

    const nav_ul_link = {
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans - serif",
        textDecoration: "none",
        fontSize: "20px",
        color: "#ffffff",
        paddingRight: "20px"
        }

return (
    <BrowserRouter>
        <div>
            <h3 style={titleHeadingStyle}>Welcome to Employee Management System</h3>

            <nav style={nav}>

            <ul style={nav_ul}>
                <li> <Link to="/" style={nav_ul_link} >Home</Link> </li>
                <li> <Link to="/create" style={nav_ul_link} >New Employee</Link> </li>
                <li> <Link to="/retirement" style={nav_ul_link} >Upcoming Retirements</Link> </li>
                
            </ul>

            </nav>
            <PageRoutes />
        </div>
    </BrowserRouter>

)
}

export default EmployeeMenu;