import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmployeeTableRow from  './EmployeeRow';


function EmployeeTable({ allEmployees, customStyles, deleteEmployee, retirement }) {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
    const allEmployeeRows = allEmployees.map((emp) => (
        <EmployeeTableRow key={emp._id} employee={emp} customstyles={customStyles} StyledTableCell = {StyledTableCell} deleteEmployee = {deleteEmployee} retirement = {retirement} />
    ));


    return (
        <div>
            <h2 style={customStyles.headingStyle}>Employee Directory</h2>

            <div style={customStyles.tableDiv}>
                
            <Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">FIRST NAME</StyledTableCell>
                            <StyledTableCell align="left">LAST NAME</StyledTableCell>
                            <StyledTableCell align="left">AGE</StyledTableCell>
                            <StyledTableCell align="left">DATE OF JOINING</StyledTableCell>
                            <StyledTableCell align="left">TITLE</StyledTableCell>
                            <StyledTableCell align="left">DEPARTMENT</StyledTableCell>
                            <StyledTableCell align="left">EMPLOYEE TYPE</StyledTableCell>
                            <StyledTableCell align="left">CURRENT STATUS</StyledTableCell>
                            {(!retirement)? <StyledTableCell align="right"> </StyledTableCell>  : ""}
                            {(!retirement)? <StyledTableCell align="right"> </StyledTableCell>  : ""}
                            {(!retirement)? <StyledTableCell align="right"> </StyledTableCell>  : ""}
                            {(retirement)? <StyledTableCell align="left">TIME TO RETIREMENT</StyledTableCell>  : ""}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {allEmployeeRows}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </Paper>

            </div>

        </div>
    )

}

export default EmployeeTable;