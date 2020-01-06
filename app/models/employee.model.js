const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    name: String,
    rollNumber: String,
}, {
        timestamps: true
    });

module.exports = mongoose.model('Employee', Employee);