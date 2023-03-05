import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import styles from "./UsersTableMui.module.css";
import { alpha } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Portal from "@mui/base/Portal";
import Modal from "@mui/material/Modal";

// const dataUsers = [
//   {
//     id: 1,
//     firstName: "Terry",
//     lastName: "Medhurst",
//     maidenName: "Smitham",
//     age: 50,
//     gender: "male",
//     email: "atuny0@sohu.com",
//     phone: "+63 791 675 8914",
//     username: "atuny0",
//     password: "9uQFF1Lh",
//     birthDate: "2000-12-25",
//     image: "https://robohash.org/hicveldicta.png",
//     bloodGroup: "A−",
//     height: 189,
//     weight: 75.4,
//     eyeColor: "Green",
//     hair: {
//       color: "Black",
//       type: "Strands",
//     },
//     domain: "slashdot.org",
//     ip: "117.29.86.254",
//     address: {
//       address: "1745 T Street Southeast",
//       city: "Washington",
//       coordinates: {
//         lat: 38.867033,
//         lng: -76.979235,
//       },
//       postalCode: "20020",
//       state: "DC",
//     },
//     macAddress: "13:69:BA:56:A3:74",
//     university: "Capitol University",
//     bank: {
//       cardExpire: "06/22",
//       cardNumber: "50380955204220685",
//       cardType: "maestro",
//       currency: "Peso",
//       iban: "NO17 0695 2754 967",
//     },
//     company: {
//       address: {
//         address: "629 Debbie Drive",
//         city: "Nashville",
//         coordinates: {
//           lat: 36.208114,
//           lng: -86.58621199999999,
//         },
//         postalCode: "37076",
//         state: "TN",
//       },
//       department: "Marketing",
//       name: "Blanda-O'Keefe",
//       title: "Help Desk Operator",
//     },
//     ein: "20-9487066",
//     ssn: "661-64-2976",
//     userAgent:
//       "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
//   },
//   {
//     id: 2,
//     firstName: "Sheldon",
//     lastName: "Quigley",
//     maidenName: "Cole",
//     age: 28,
//     gender: "male",
//     email: "hbingley1@plala.or.jp",
//     phone: "+7 813 117 7139",
//     username: "hbingley1",
//     password: "CQutx25i8r",
//     birthDate: "2003-08-02",
//     image: "https://robohash.org/doloremquesintcorrupti.png",
//     bloodGroup: "O+",
//     height: 187,
//     weight: 74,
//     eyeColor: "Brown",
//     hair: {
//       color: "Blond",
//       type: "Curly",
//     },
//     domain: "51.la",
//     ip: "253.240.20.181",
//     address: {
//       address: "6007 Applegate Lane",
//       city: "Louisville",
//       coordinates: {
//         lat: 38.1343013,
//         lng: -85.6498512,
//       },
//       postalCode: "40219",
//       state: "KY",
//     },
//     macAddress: "13:F1:00:DA:A4:12",
//     university: "Stavropol State Technical University",
//     bank: {
//       cardExpire: "10/23",
//       cardNumber: "5355920631952404",
//       cardType: "mastercard",
//       currency: "Ruble",
//       iban: "MD63 L6YC 8YH4 QVQB XHIK MTML",
//     },
//     company: {
//       address: {
//         address: "8821 West Myrtle Avenue",
//         city: "Glendale",
//         coordinates: {
//           lat: 33.5404296,
//           lng: -112.2488391,
//         },
//         postalCode: "85305",
//         state: "AZ",
//       },
//       department: "Services",
//       name: "Aufderhar-Cronin",
//       title: "Senior Cost Accountant",
//     },
//     ein: "52-5262907",
//     ssn: "447-08-9217",
//     userAgent:
//       "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.30 (KHTML, like Gecko) Ubuntu/11.04 Chromium/12.0.742.112 Chrome/12.0.742.112 Safari/534.30",
//   },
// ];

export const UsersTableMui = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof users>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const usrLength = users.length;

  interface users {
    id: number;
    firstName: string;
    lastName: string;
  }

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

  interface HeadCell {
    disablePadding: boolean;
    id: keyof users;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID osoby",
    },
    {
      id: "firstName",
      numeric: false,
      disablePadding: true,
      label: "firstName",
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: true,
      label: "last Name",
    },
    {
      id: "height",
      numeric: false,
      disablePadding: true,
      label: "height",
    },
    {
      id: "weight",
      numeric: false,
      disablePadding: true,
      label: "weight",
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof users
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof users) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteSelected}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          // <Tooltip title="Filter list">
          //   <IconButton>
          //     <FilterListIcon />
          //   </IconButton>
          // </Tooltip>
          <></>
        )}
      </Toolbar>
    );
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
    property: keyof users
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

  // Action when user clicks on a row -> select ROW
  // const handleClickSelect = (event: React.MouseEvent<unknown>, name: string) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: readonly string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

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
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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

  // Zruší výběr všech řádků
  const handleDeleteSelected = () => {
    setSelected([]);
  };

  return (
    <Fragment>
      <UserModal></UserModal>
      <Box sx={{ width: "100%" }}>
        {/* <EnhancedTableToolbar sx={{ width: "80%", m:"auto" }} numSelected={selected.length} /> */}
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
              {/* <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>meno</TableCell>
                  <TableCell>priezvisko</TableCell>
                </TableRow>
              </TableHead> */}

              <TableBody>
                {/* {mapUsers} */}

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
