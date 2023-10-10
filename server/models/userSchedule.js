const mongoose = require("mongoose");

const userScheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkInTime: {
    value: String,
    timestamp: Date,
  },
  checkOutTime: {
    value: String,
    timestamp: Date,
  },
  onLeave: Boolean,
  status: String,
  spentTime: String,
  totalLeavesTaken: Number,
  totalLeavesAllowed: Number,
  leave: {
    type: [{
      leaveType: String,
      numberOfDays: Number,
      status: String,
    }],
    default: [],
  },
});

const UserSchedule = mongoose.model("UserSchedule", userScheduleSchema);

module.exports = UserSchedule;
