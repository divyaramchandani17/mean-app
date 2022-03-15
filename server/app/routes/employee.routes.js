module.exports = app => {
    const employees = require("../controllers/employee.controller");
    var router = require("express").Router();
    // Create a new Employee
    router.post("/", employees.create);
    // Retrieve all Employees
    router.get("/get", employees.findAll);
    // Retrieve a single Employee with id
    router.get("/get/:id", employees.findOne);
    // Update a Employee with id
    router.put("/update/:id", employees.update);
    // Delete a Employee with id
    router.delete("/delete/:id", employees.delete);
    app.use('/api/employee', router);
  };