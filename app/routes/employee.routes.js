module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');
    const empModel = require('../models/employee.model.js');

    app.get('/home', auth, (req, res) => {
        empModel.find()
            .then(employeeList => {
                res.render('home', { data: employeeList });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Employee."
                });
            });
    });

    // Retrieve all employee
    app.get('/employee', auth, employee.findAll)

    app.get('/register', (req, res) => {
        res.render('register_employee', { title: 'Employee Registration', buttonName: 'Submit' });
    })

    // Create a new employee
    app.post('/employee', employee.create);

    app.get('/employee-update/:id', auth, employee.findOne);

    // Update a employee with employeeId
    app.post('/employee-update', auth, employee.update);

    // Retrieve a single employee with employeeId
    app.get('/employee/:employeeId', auth, employee.findOne);

    // Delete a employee with employeeId
    app.get('/employee-delete/:employeeId', auth, employee.delete);
}

const path = require('path');

// Authentication and Authorization Middleware
var auth = (req, res, next) => {
    if (req.session && req.session.user)
        return next();
    else
        res.sendFile(path.join(__dirname + '/../views/access_denied.html'));
};