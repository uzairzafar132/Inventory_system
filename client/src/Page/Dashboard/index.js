import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import axios from 'axios';

import { employeesData } from '../../data';

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        console.log(id.row.original)
        setSelectedEmployee(id.row.original);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        console.log(id.row.original)
       
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                console.log("inner")
                // const [employee] = employees.filter(employee => employee.id === id);
                axios
                .delete(`http://localhost:8080/api/employee/delete/${id.row.original._id}`)
                .then((response) => {
                  console.log('Employee deleted successfully:', response.data);
                  // You can perform additional actions or update your UI here.
                })
                .catch((error) => {
                  console.error('Error deleting employee:', error);
                  // Handle the error appropriately.
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: ` data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }


    useEffect(() => {
        // Define an asynchronous function to fetch employees
        async function fetchEmployees() {
          try {
            const response = await axios.get('http://localhost:8080/api/employee/get'); 
            if (response.status === 200) {
              const data = response.data;
              console.log(data);
              setEmployees(data);
            } else {
              console.error('Failed to fetch employees');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
    
        // Call the function to fetch employees when the component mounts
        fetchEmployees();
      }, []);

    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;