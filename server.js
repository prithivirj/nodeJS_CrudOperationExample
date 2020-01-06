const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

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
    res.json({"message": "Node js sample CRUD operation."});
});

require('./app/routes/employee.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});