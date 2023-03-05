// Aktuálně se komponenta nepoužívá!
import React, { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import interfaces from "../IFUsersTableMui";

export const EnhancedTableToolbar = (
  props: interfaces.EnhancedTableToolbarProps
) => {
  const { numSelected } = props;

// ! state propojit s rodičem
  const [selected, setSelected] = useState<readonly string[]>([]);


  // Zruší výběr všech řádků
  const handleDeleteSelected = () => {
    setSelected([]);
  };



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
};
