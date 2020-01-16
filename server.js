const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'secretKey',
    resave: false,
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
    console.log('db connection failure', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Node js sample CRUD operation." });
});

require('./app/routes/employee.routes.js')(app);

const employee = require('./app/controllers/employee.controller.js');

app.post('/login', (req, res) => {

    if (!req.body.username) {
        res.send({ message: 'Username is required' })
    }
    if (!req.body.password) {
        res.send({ message: 'password is required' })
    }
    if (req.body && req.body.username && req.body.password) {
        const emp = employee.login;
        req.session.user = emp;
        res.send({
            'message' : 'Login successful', 'payload': emp
        });
    }
});

app.get('/logout', (req, res) => {
    console.log('cookie',req.cookies);
    if (req.session.user && req.cookies.user_sid) {
        req.session.destroy();
        res.clearCookie('user_sid');
        res.send({'messsage': 'User logged out!'})
    }
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});