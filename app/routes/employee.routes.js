module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');
    //view home
    app.get('/home', auth, (req, res) => {
        res.render('home');
    });

    app.get('/register', (req, res) => {
        res.render('edit_employee', { title: 'Employee Registration', buttonName: 'Submit' });
    })

    app.get('/employee-update', auth, (req, res) => {
        res.render('edit_employee', { title: 'Update Employee', buttonName: 'Update' });
    })

    // Create a new employee
    app.post('/employee', employee.create);

    // Retrieve all employee
    app.get('/employee', auth, employee.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employee/:employeeId', auth, employee.findOne);

    // Update a employee with employeeId
    app.put('/employee/:employeeId', auth, employee.update);

    // Delete a employee with employeeId
    app.delete('/employee/:employeeId', auth, employee.delete);
}

const path = require('path');

// Authentication and Authorization Middleware
var auth = (req, res, next) => {
    if (req.session && req.session.user)
        return next();
    else
        res.sendFile(path.join(__dirname + '/../views/access_denied.html'));
};