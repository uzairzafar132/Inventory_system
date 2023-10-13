import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
// import DateRangePicker from '../UI/DatePicker/DatePickerField'
import DateRangePicker from '../UI/DatePicker/DatePickerField'
import FileUploader from './FileUploader'



function LeaveApplicationForm () {
    const [leaveType, setLeaveType] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");
    const [status, setStatus] = useState("pending");
  
    const [selectedFile, setSelectedFile] = useState(null);

    const [selectedDateRange, setSelectedDateRange] = useState({
      startDate: null,
      endDate: null,
    });
  
    // Define a function to update the selectedDateRange
    const handleDateRangeChange = (startDate, endDate) => {
      setSelectedDateRange({ startDate, endDate });
    };

    const handleFileUpload = (file) => {
      setSelectedFile(file);
      console.log(file)
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const id = localStorage.getItem("userid");
  
      try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("leaveType", leaveType);
        formData.append("numberOfDays", numberOfDays);
        formData.append("status", status);
        formData.append("id", id);
        formData.append("pdfFile", selectedFile);
  
        // Make a POST request to your server endpoint
        const response = await axios.post(
          "http://localhost:8080/api/apply-leave",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 201) {
          // Successful response, you can handle it here
          console.log("Leave application submitted successfully");
          // Reset the form fields
          setLeaveType("");
          setNumberOfDays("");
          setStatus("pending");
          setSelectedFile(null);
        }
      } catch (error) {
        console.error("Error submitting leave application:", error);
        // Handle the error here, e.g., show an error message to the user
      }
    };
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Leave Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="leaveType">Leave Type</InputLabel>
                <Select
                  id="leaveType"
                  name="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <MenuItem value="">Select Leave Type</MenuItem>
                  <MenuItem value="casual-leave">Casual Leave</MenuItem>
                  <MenuItem value="sick-leave">Sick Leave</MenuItem>
                  <MenuItem value="personal-leave">Parental Leave</MenuItem>
                  <MenuItem value="annual-leave">Annual Leave</MenuItem>
    
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
           {/* < DatePicker startDate={} endDate={} /> */}
           <div>
           <DateRangePicker
        startDate={selectedDateRange.startDate}
        endDate={selectedDateRange.endDate}
        onDateChange={handleDateRangeChange}
      />
           </div>
           
          
            </Grid>

            <Grid item xs={12}  style={{
            // border: "1px solid #666666",
            borderRadius: "5px",
            borderColor: "#666666",
            // padding: "2%",
            height: "3rem",
          }}>
          
            <FileUploader onFileUpload={handleFileUpload} />
            </Grid>
          
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  };
  

  export default LeaveApplicationForm;