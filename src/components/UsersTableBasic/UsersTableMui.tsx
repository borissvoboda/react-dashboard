import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import styles from "./UsersTableMui.module.css";

import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Portal from "@mui/base/Portal";
import Modal from "@mui/material/Modal";
import interfaces from "./IFUsersTableMui";
import EnhancedTableHead from "./MuiTableComponents/EnhancedTableHead";

export const UsersTableMui = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof interfaces.users>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dummyjson.com/users/",
    })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const rows = [...users];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof interfaces.users
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>('');

  const UserModal = () => {
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

    return (
      <div>
      <Modal
        open={modalIsOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description
          </Typography>
        </Box>
      </Modal>
      </div>
    );
  };

  // Zavřít modal
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  // Po té, co uživatel klikne na řádek, zobrazí se detail dané osoby
  const handleClick = (event: React.MouseEvent<unknown>, firstName: string, lastName: string) => {
    setModalIsOpen(true);
    setSelectedName(`${lastName}, ${firstName}`);
  };

  return (
    <Fragment>
      <UserModal></UserModal>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "80%", m: "auto", boxShadow: 0 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.firstName, row.lastName)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                          align="right"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="right">{row.height}</TableCell>
                        <TableCell align="right">
                          {(Math.round(row.weight * 10) / 10).toFixed(1)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Fragment>
  );
};
