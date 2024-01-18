const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const Moment = require('react-moment');
const moment = require('moment');

require('./models/db');
const mongoose = require('mongoose')
const Employee = require('./models/employees');

const typeDefs = `
    type employee {
        _id : String,
        id : Int,
        firstname : String,
        lastname : String,
        age : Int,
        dateofjoining : String,
        title : String,
        department : String,
        employeetype : String,
        currentstatus : Boolean
    }
    type Query {
        employeeList(employeetype: String, department : String, title : String, currentstatus : Boolean, retirement : Boolean): [employee],
        getEmployee(id: String) : employee
        
    }
    type Mutation {
        addNewEmployee(firstname: String!, lastname: String!, age: Int!, dateofjoining : String, title : String, department : String, employeetype : String) : employee,   
        modifyEmployee(title : String, department : String, currentstatus : Boolean, id : String) : employee,
        deleteEmployee(id: String) : employee    
    }
`;

const resolvers = {
  Query: {
    employeeList,
    getEmployee

  },
  Mutation: {
    addNewEmployee,
    modifyEmployee,
    deleteEmployee
  },
};


async function getEmployee(_, { id }) {

  return (await Employee.findById(mongoose.Types.ObjectId(id)));
}


async function addNewEmployee(_, {
  firstname, lastname, age, dateofjoining, title, department, employeetype,
}) {
  const employeeNew = {
    firstname,
    lastname,
    age,
    dateofjoining,
    title,
    department,
    employeetype,
  };

  const countEmployee = await (Employee.find().count());
  employeeNew.id = countEmployee + 1;
  employeeNew.currentstatus = 1;

  await Employee.create(employeeNew);

  return employeeNew;
}


async function modifyEmployee(_, { title, department, currentstatus, id }) {

  const updateEmployee = {
    title,
    department,
    currentstatus,
    id
  };

  currentstatus = (currentstatus) ? 1 : 0;

  await Employee.findByIdAndUpdate(id, { title: title, department: department, currentstatus: currentstatus })

  return updateEmployee;
}


async function deleteEmployee(_, { id }) {

  const deleteEmployee = {

    id
  };

  await Employee.findByIdAndRemove(id)

  return deleteEmployee;
}


async function employeeList(_, { employeetype, department, title, currentstatus, retirement }) {

  let query = {};
  
  if (employeetype !== "null" && employeetype !== "") {
    query.employeetype = employeetype;
  }

  if (department !== "null" && department !== "") {
    query.department = department;
  }

  if (title !== "null" && title !== "") {
    query.title = title;
  }

  if (currentstatus === true || currentstatus === false) {
    query.currentstatus = currentstatus;
  }

  if (retirement) {

    var allemployees = await Employee.find(query);

    const retireEmployee = []

    allemployees.forEach(function (emp) {
      if(emp.currentstatus){
        if (calculateAge(emp.dateofjoining, emp.age)) {
          retireEmployee.push(emp)
        }
      }
    });

    return retireEmployee;
  }

  return (await Employee.find(query));

}


function calculateAge(dateofjoining, ageWhenJoins) {

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


  if ((years == 0 && months < 6) || (years == 0 && months == 6 && days == 0)) {
    // console.log("helloo " + ageWhenJoins);
    return true
  }
  return false
}


const apolloserver = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.static('public'));


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

apolloserver.start()
  .then(() => {
    apolloserver.applyMiddleware({ app, path: '/graphql', cors: corsOptions });
  });

app.listen('4000', () => {
  console.log('Server is running...');
});
