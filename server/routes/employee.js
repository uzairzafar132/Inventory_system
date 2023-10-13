const express = require('express');
const Employee = require('../models/employee'); // Import your Mongoose Employee model

const router = express.Router();

// Create a route to save an employee
router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, email, salary, date } = req.body;

    // Create a new employee instance using the Mongoose model
    const employee = new Employee({
      firstName,
      lastName,
      email,
      salary,
      date,
    });

    // Save the employee to the database
    await employee.save();

    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while adding the employee' });
  }
});


router.get('/get', async (req, res) => {
    try {
      // Use the Mongoose model to find all employees in the database
      const employees = await Employee.find({});
  
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while retrieving employees' });
    }
  });


  router.put('/put/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      const updatedEmployeeData = req.body;
  
      // Validate that the request body contains valid employee data before updating
  
      // Find the employee by ID and update their data
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId },
        { $set: updatedEmployeeData },
        { new: true } // Returns the updated document
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      return res.json(updatedEmployee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.delete('/delete/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
  
      // Use Mongoose to find and remove the employee from the database
      const deletedEmployee = await Employee.findOneAndDelete({ _id: employeeId });
  
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      return res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;
