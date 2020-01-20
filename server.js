const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: false
}));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to the db");
}).catch(err => {
    console.log('db connection failure');
    process.exit();
});

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

require('./app/routes/employee.routes.js')(app);

const Employee = require('./app/models/employee.model.js');

app.get('/', (req, res) => {
    //res.send({ message: 'Welcome'});
    res.render('login');
});

app.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname + '/app/views/login.html'));
    res.render('login');
});

app.post('/login', (req, res) => {

    if (!req.body.username) {
        res.send({ message: 'Username is required' })
    }
    if (!req.body.password) {
        res.send({ message: 'password is required' })
    }
   
    if (req.body && req.body.username && req.body.password) {
        Employee.findOne({ 'username': req.body.username, 'password': req.body.password })
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: "Invalid Username / Password"
                    });
                } else {
                    req.session.user = data;
                    // return res.send({
                    //     'message': 'Login successful', 'payload': data
                    // });
                    res.redirect('/home');
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Error - " + err
                });
            });
    }
});

app.get('/logout', (req, res) => {
    console.log('req.session ', req.session)
    if (req.session.user) {
        req.session.destroy();
        //res.send({ 'messsage': 'User logged out!' })
        res.redirect('/login');
    } else {
        res.send({ 'messsage': 'Logout Failed!' })
    }
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is running");
});