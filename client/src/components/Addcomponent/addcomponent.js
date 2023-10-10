import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    partNo: '',
    quantity: '',
    projectId: '',
    birthNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        name="partNo"
        label="Part Number"
        variant="outlined"
        fullWidth
        value={formData.partNo}
        onChange={handleChange}
      />
      <TextField
        name="quantity"
        label="Quantity"
        variant="outlined"
        fullWidth
        value={formData.quantity}
        onChange={handleChange}
      />
      <TextField
        name="projectId"
        label="Project ID"
        variant="outlined"
        fullWidth
        value={formData.projectId}
        onChange={handleChange}
      />
      <TextField
        name="birthNo"
        label="Birth Number"
        variant="outlined"
        fullWidth
        value={formData.birthNo}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default MyForm;
