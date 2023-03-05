import React from "react";
import { Fragment, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

export const UsersReactTable = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "John",
        col2: "Smith",
      },
      {
        col1: "George",
        col2: "McCarter",
      },
      {
        col1: "Deidre",
        col2: "Noel",
      },
      {
        col1: "Mark",
        col2: "Sherrod",
      },
      {
        col1: "Neil",
        col2: "Amaral",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Surname",
        accessor: "col2",
      },
    ],
    []
  );
  // const tableInstance = useTable({ columns, data });

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      // setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        // defaultColumn, // Be sure to pass the defaultColumn option
        // filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    )

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
