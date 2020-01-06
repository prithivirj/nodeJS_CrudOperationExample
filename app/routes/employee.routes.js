module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new employee
    app.post('/employee', employee.create);

    // Retrieve all employee
    app.get('/employees', employee.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employee/:employeeId', employee.findOne);

    // Update a employee with employeeId
    app.put('/employee/:employeeId', employee.update);

    // Delete a employee with employeeId
    app.delete('/employee/:employeeId', employee.delete);
}