const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;