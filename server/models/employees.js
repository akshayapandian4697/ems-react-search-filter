const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

    id: Number,
    firstname: { 
        type: String, 
        required : [true, 'Please enter the firstname']
    },
    lastname: { 
        type: String, 
        required : [true, 'Please enter the lastname']
    },
    age: { 
        type: Number, 
        required : [true, 'Please enter the age'],
    },
    dateofjoining: { 
        type: Date, 
        default: new Date() 
    },
    title: { 
        type: String, 
        required : [true, 'Please select a title']
    },
    department: { 
        type: String, 
        required : [true, 'Please select a department']
    },
    employeetype: { 
        type: String, 
        required : [true, 'Please select an employee type']
    },
    currentstatus: { 
        type: Boolean, 
        default : true
    }

});

const Employee = mongoose.model('Employee', EmployeeSchema, "employees");
module.exports = Employee;