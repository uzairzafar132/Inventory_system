// import React, { useState } from 'react';
// import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';


// function OfficeTimeTracker() {
//   const [checkInTime, setCheckInTime] = useState({ value: '', timestamp: null });
//   const [checkOutTime, setCheckOutTime] = useState({ value: '', timestamp: null });
//   const [spentTime, setSpentTime] = useState(null);

//   const handleCheckInChange = (event) => {
//     const timestamp = new Date().toISOString();
//     setCheckInTime({ value: event.target.value, timestamp });
//     calculateSpentTime(checkOutTime.timestamp, timestamp);
//   };

//   const handleCheckOutChange = (event) => {
//     const timestamp = new Date().toISOString();
//     setCheckOutTime({ value: event.target.value, timestamp });
//     calculateSpentTime(timestamp, checkInTime.timestamp);
//   };

//   const calculateSpentTime = (checkOutTimestamp, checkInTimestamp) => {
//     if (checkOutTimestamp && checkInTimestamp) {
//       const checkOutTime = new Date(checkOutTimestamp);
//       const checkInTime = new Date(checkInTimestamp);
//       const timeDifference = checkOutTime - checkInTime;
//       const hours = Math.floor(timeDifference / 3600000); // 3600000 ms in an hour
//       const minutes = Math.floor((timeDifference % 3600000) / 60000); // 60000 ms in a minute
//       setSpentTime(`${hours} hours and ${minutes} minutes`);
//     } else {
//       setSpentTime(null);
//     }
//   };

//   return (
//     <div>
//       <RadioGroup name="checkInTime" value={checkInTime.value} onChange={handleCheckInChange}>
//         <FormControlLabel value="morning" control={<Radio />} label=" Check-In" />
//       </RadioGroup>

//       <RadioGroup name="checkOutTime" value={checkOutTime.value} onChange={handleCheckOutChange}>
//         <FormControlLabel value="evening" control={<Radio />} label=" Check-Out" />
//       </RadioGroup>
//       {checkInTime.timestamp && (
//           <p>Check-In Timestamp: {checkInTime.timestamp}</p>
//         )}

//         {checkOutTime.timestamp && (
//           <p>Check-Out Timestamp: {checkOutTime.timestamp}</p>
//         )}
//       {spentTime && <p>Spent Time: {spentTime}</p>}
//     </div>
//   );
// }

// export default OfficeTimeTracker;
import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Radio, RadioGroup, Typography } from '@mui/material';

function OfficeStatusForm() {
    const [checkInTime, setCheckInTime] = useState({ value: '', timestamp: null });
    const [checkOutTime, setCheckOutTime] = useState({ value: '', timestamp: null });
    const [onLeave, setOnLeave] = useState(false);
    const [status, setStatus] = useState('available');
    const [spentTime, setSpentTime] = useState(null);
    const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
    const [totalLeavesAllowed, setTotalLeavesAllowed] = useState(10);
  
    const handleCheckInChange = (event) => {
      const timestamp = new Date().toISOString();
      setCheckInTime({ value: event.target.value, timestamp });
      calculateSpentTime(timestamp, checkOutTime.timestamp);
    };
  
    const handleCheckOutChange = (event) => {
      const timestamp = new Date().toISOString();
      setCheckOutTime({ value: event.target.value, timestamp });
      calculateSpentTime(checkInTime.timestamp, timestamp);
    };
  
    const handleOnLeaveChange = (event) => {
        if (event.target.checked) {
          if (totalLeavesTaken < totalLeavesAllowed) {
            setOnLeave(true);
            setTotalLeavesTaken(totalLeavesTaken + 1);
          } else {
            // Notify the user that the allowed limit has been reached
          }
        } else {
          setOnLeave(false);
          setTotalLeavesTaken(totalLeavesTaken - 1);
        }
      };
    
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
  
    const calculateSpentTime = (checkInTimestamp, checkOutTimestamp) => {
      if (checkInTimestamp && checkOutTimestamp) {
        const checkInTime = new Date(checkInTimestamp);
        const checkOutTime = new Date(checkOutTimestamp);
        const timeDifference = checkOutTime - checkInTime;
        const hours = Math.floor(timeDifference / 3600000); // 3600000 ms in an hour
        const minutes = Math.floor((timeDifference % 3600000) / 60000); // 60000 ms in a minute
        setSpentTime(`${hours} hours and ${minutes} minutes`);
      } else {
        setSpentTime(null);
      }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const id = localStorage.getItem('userid');
      console.log( id)
        // Create an object with the form data
        const formData = {
          checkInTime,
          checkOutTime,
          onLeave,
          status,
          spentTime,
          totalLeavesTaken,
          totalLeavesAllowed,
          id
        };
      
        try {
          // Make a POST request to your server endpoint
          const response = await fetch('http://localhost:8080/api/userSchedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            // Data was successfully saved on the server
            console.log('Data saved successfully');
          } else {
            // Handle the case where the server returned an error
            console.error('Error saving data');
          }
        } catch (error) {
          console.error('Error saving data', error);
        }
      };
      
      

  return (
    <div>
      <Typography variant="h5">Office Status Form</Typography>
      <form onSubmit={handleSubmit}>
      <RadioGroup name="checkInTime" value={checkInTime.value} onChange={handleCheckInChange}>
        <FormControlLabel value="checked-in" control={<Radio />} label=" Check-In" />
      </RadioGroup>

      <RadioGroup name="checkOutTime" value={checkOutTime.value} onChange={handleCheckOutChange}>
        <FormControlLabel value="checked-out" control={<Radio />} label=" Check-Out" />
      </RadioGroup>

      {spentTime && <p>Spent Time: {spentTime}</p>}
      <FormControlLabel
          control={<Checkbox checked={onLeave} onChange={handleOnLeaveChange} />}
          label="On Leave"
        />
        <Typography variant="body2" color="textSecondary">
          Total Leaves: {totalLeavesTaken}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="status">Status</InputLabel>
          <Select
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="prayer">Prayer</MenuItem>
            <MenuItem value="on-leave">On Leave</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default OfficeStatusForm;

