import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import dateicons from '../../../images/dateicon.svg'

function DateRangePickerComponent({ startDate, endDate, onDateChange }) {
  // State to store the selected date range
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Callback function to handle date range changes
  const handleDateRangeChange = (event, picker) => {
    // Call the onDateChange function to update the parent component's state
    onDateChange(picker.startDate, picker.endDate);
  };

  return (
    <div>
    
      <DateRangePicker
        onApply={handleDateRangeChange}
      >
    <div style={{
  border: "1px solid #666666",
  borderRadius: "5px",
  borderColor: "#666666",
  padding: "2%",
  height: "3rem",
}}>
  {startDate && endDate ? ( // Check if startDate and endDate are defined
    <p style={{
      marginRight: "auto",
      marginLeft: "0.8rem",
      // marginTop: "0.8rem",
      fontWeight: "600",
      fontSize: "16px",
      color: "#1565c0",
    }}>
      {startDate.format("MM/DD/YYYY")} to {endDate.format("MM/DD/YYYY")}
    </p>
  ) : (
    // Display when startDate and endDate are not defined
    <>
      Selected Date Range
      <img style={{ float: "right", width: "3%" }} src={dateicons} alt="" />
    </>
  )}
</div>

      </DateRangePicker>
    </div>
  );
}

export default DateRangePickerComponent;
