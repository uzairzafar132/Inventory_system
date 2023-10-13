import React, { useContext, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
function List({ employees, handleEdit, handleDelete }) {
 
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });


  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", // Make sure this corresponds to the employee ID property
        Header: "No.",
        size: 150,
      },
      {
        accessorKey: "firstName", // Make sure this corresponds to the employee ID property
        Header: "First Name",
        size: 130,
      },
      {
        accessorKey: "lastName", // Make sure this corresponds to the employee ID property
        Header: "Last Name",
        size: 130,
      },
      {
        accessorKey: "email", // Make sure this corresponds to the employee ID property
        Header: "Email",
        size: 150,
      },
      {
        accessorKey: "salary", // Make sure this corresponds to the employee ID property
        Header: "Salary",

        size: 150,
      },
      {
        accessorKey: "date", // Make sure this corresponds to the employee ID property
        Header: "Date",

        size: 150,
      },

      {
        Header: "Actions",
        accessorKey: "_id",
        Cell: (value ) => (
          <>
            <button
              onClick={() =>handleEdit(value)}
              className="button muted-button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(value)}
              className="button muted-button"
            >
              Delete
            </button>
          </>
        ),
        size: 200,
      },
    ],
    []
  );

  return (
    <div className="contain-table">
      <MaterialReactTable data={employees} columns={columns} />
    </div>
  );
}

export default List;
