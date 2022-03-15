const bcrypt = require('bcryptjs');
const db = require("../models");
const Employee = db.employees;
// Create and Save a new Employee
exports.create = async (req, res) => {
    try {
      // Create an Employee
      const employee = new Employee({
          empNo: req.body.empNo,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          phoneNo: req.body.phoneNo,
          department: req.body.department,
          salary: req.body.salary,
          hireDate: req.body.hireDate,
          jobTitle: req.body.jobTitle,
          qualification: req.body.qualification,
          noOfExperienceYears: req.body.noOfExperienceYears
      });
    const salt = await bcrypt.genSalt(10);
     employee.password = await bcrypt.hash(employee.password, salt);
      // Save Employee in the database
      let data = await employee.save(employee);
      if(!data) {
        res.status(500).send({
            message:
                "Some error occurred while creating the Employee."
            });
        }
        else {
            res.send(data);
        }
    }
    catch {
        (err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
                });
        }
    }
};
// Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
    try {
        let data = await Employee.find();
    if(!data) {
        res.status(500).send({
            message:
              "Some error occurred while retrieving Employees."
          });
        }
    else {
        res.send(data);
    }
}
catch {
    (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Employees."
            });
    }
}
};
// Find a single Employee with an id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Employee.findById(id);
        if(!data) {
            res.status(500).send({
                message:
                  "Some error occurred while retrieving the Employee."
              });
            }
        else {
            res.send(data);
        }
    }
    catch {
        (err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Employee."
                });
        }
    }
  
};
// Update a Employee by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
        let data = await Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if(!data) {
            res.status(500).send({
                message:
                  "Some error occurred while retrieving the Employee."
              });
            }
        else {
            res.send(data);
        }
  }
  catch {
      (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating an Employee."
            });
      }
  }
};
// Delete a Employee with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
        let data = await Employee.findByIdAndRemove(id);
        res.send(data);
  }
  catch {
      (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting Employee."
            });
      }
  }
};