module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new employee
    app.post('/employee', employee.create);

    // Retrieve all employee
    app.get('/getAllEmployee', auth , employee.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employee/:employeeId', auth , employee.findOne);

    // Update a employee with employeeId
    app.put('/employee/:employeeId', auth , employee.update);

    // Delete a employee with employeeId
    app.delete('/employee/:employeeId', auth , employee.delete);
}

// Authentication and Authorization Middleware
var auth = (req, res, next) => {
    if (req.session && req.session.user)
        return next();
    else
        return res.status(401).send({ message: 'Unauthorized Access' });
};