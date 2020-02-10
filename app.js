const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require('asciiart-logo');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "sunny123",
    database: "employee_db"
});

// start connection
connection.connect(function(err) {
    if (err) throw err;
  });

// inquirer prompts

const options = ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']

renderHeader()

function employeeTracker() { inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "picked",
      choices: options
    }
  ])
  .then(function(response) {  
    switch(response.picked) {
        case options[0]:    
            viewAllDepartments();
            break;
        case options[1]:
            viewAllRoles();
            break;
        case options[2]:
            viewAllEmployees();
            break;
            // inquirer
            // .prompt([
            //     {
            //     message: "Which starting year?",
            //     name: "startYear",
            //     },
            //     {
            //     message: "Which end year?",
            //     name: "endYear"
            //     }
            // ])
            // .then(function(response) {
            //     console.log(response.startYear);
            //     console.log(response.endYear)
            //     specificYearRange(response.startYear, response.endYear) 
            // });
        case options[3]:
            addDepartment();
            break;
        case options[4]:
            addRole();
            break;
        case options[5]:
            addEmployee();
            break;
        case options[6]:
            updateEmployeeRole();
            break;
    }
  });
};
// * The command-line application should allow users to:

//   * Add departments, roles, employees
function addDepartment() {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the name of the new department?",
          name: "name",
        }
      ])
      .then(function(response) {  
    connection.query(`INSERT INTO department (name) VALUES('${response.name}')`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.table(res);
    });  
    employeeTracker();  
    });    
};

// addDepartment('executive');

function addRole() {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the title of the new role?",
          name: "title",
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary",
        }
      ])
      .then(function(response) {  
    connection.query(`INSERT INTO role (title, salary) VALUES('${response.title}',${response.salary})`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.table(res);
    });
    employeeTracker();
    });
};

// addRole('ceo',500000,5)

function addEmployee() {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the first name?",
          name: "first",
        },
        {
            type: "input",
            message: "What is the last name?",
            name: "last",
        },
        {
            type: "input",
            message: "What is the role?",
            name: "role",
        },
        {
            type: "input",
            message: "Who is the manager?",
            name: "manager",
        }
      ])
      .then(function(response) {  
    
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${response.first}','${response.last}',${response.role},${response.manager})`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.table(res);
    });
    employeeTracker();
    });
};

// addEmployee('rob','moe',4,3);

//   * View departments, roles, employees
function viewAllDepartments() {
    
    connection.query(`SELECT * FROM department`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    employeeTracker();
    });
};

// viewAllDepartments();

// viewAllDepartments();

function viewAllRoles() {
    
    connection.query(`SELECT role.id, role.salary, department.name FROM role JOIN department ON role.department_id = department.id`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    employeeTracker();
    });
};

// viewAllRoles();

function viewAllEmployees() {
    
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee, role, department WHERE employee.id = role.id AND role.department_id = department.id`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    employeeTracker();
    });
};

// viewAllEmployees();

//   * Update employee roles

function updateEmployeeRole() {
    inquirer.prompt([
        {
          type: "input",
          message: "Which employee?",
          name: "id",
        },
        {
            type: "input",
            message: "What is the new role?",
            name: "newId",
        }
      ])
      .then(function(response) {  
    connection.query(`UPDATE employee SET employee.role_id = ${response.id} WHERE employee.id = ${response.newId}`,
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.table(res);
    });
    employeeTracker();
    });
};

// updateEmployeeRole(3,1);
 
function renderHeader() { 
    console.log(
    logo({
        name: 'Employee Tracker',
        font: 'Big Money-ne',
        lineChars: 3,
        padding: 2,
        margin: 0,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .render()
    );
}

// renderHeader();
employeeTracker();

