const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    mobileNo: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Employee', Employee);