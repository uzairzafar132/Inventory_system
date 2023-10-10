const express = require("express");
const router = express.Router();
const Schedule = require("../models/userSchedule"); // Replace with the actual path to your model

router.post("/userSchedule", async (req, res) => {
  try {
    // Create a new user document based on the request body
    const userId = req.body.id; // Adjust this based on how you send the user's _id in the request

    // Create a new UserSchedule document with the user's _id and other properties
    const newUserSchedule = new Schedule({
      user: userId,
      checkInTime: req.body.checkInTime,
      checkOutTime: req.body.checkOutTime,
      onLeave: req.body.onLeave,
      status: req.body.status,
      spentTime: req.body.spentTime,
      totalLeavesTaken: req.body.totalLeavesTaken,
      totalLeavesAllowed: req.body.totalLeavesAllowed,
    });

    // Save the UserSchedule document to the database
    await newUserSchedule.save();

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/apply-leave", async (req, res) => {
    try {
    
      const userId = req.body.id;
  
      // Create a new leave object with the submitted data
      const newLeave = {
        leaveType: req.body.leaveType,
        numberOfDays: req.body.numberOfDays,
        status: "pending", 
      };

      const userSchedule = await Schedule.findOne({ user: userId });
  
      if (userSchedule) {
        userSchedule.leave.push(newLeave);
        await userSchedule.save();
  
        res.status(201).json({ message: "Leave application submitted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
