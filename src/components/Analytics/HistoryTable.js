import React, { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  TableFooter,
  TablePagination,
  Box,
  Collapse,
  Typography,
} from "@mui/material";

import "../../styles/analytics_css/HistoryTable.css";
import { useBins } from "../../contexts/BinContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { Spinner } from "../Spinner";
import { TablePaginationActions } from "./TablePaginationActions";

//format date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date));

// HistoryTable component
function HistoryTable() {
  // Fetch bins data and loading state from context
  const { bins, isLoading } = useBins();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handler for changing page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler for changing rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-outer-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            {/* Table heading */}
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Bin Id</TableCell>
                <TableCell align="center">Latitude</TableCell>
                <TableCell align="center">Longitude</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Fill Threshold</TableCell>
                <TableCell align="center">Last Emptied</TableCell>
              </TableRow>
            </TableHead>

            {/* Table body */}
            <TableBody>
              {(rowsPerPage > 0
                ? bins.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : bins
              ).map((bin) => (
                <Row key={bin.id} value={bin} />
              ))}
            </TableBody>

            {/* Table footer with pagination */}
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={bins.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

// Row component for rendering each row in the table
function Row({ value }) {
  const [open, setOpen] = useState(false);

  // Function to format timestamp or return "N/A" if null
  const formatTimestamp = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  return (
    <React.Fragment>
      <TableRow
        className="table-body-row"
        sx={{ "& > *": { borderBottom: "0px" } }} 
        colSpan={7}
      >
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{value.id}</TableCell>
        <TableCell align="center">{value.latitude}</TableCell>
        <TableCell align="center">{value.longitude}</TableCell>
        <TableCell align="center">{value.capacity}</TableCell>
        <TableCell align="center">{value.fillThreshold}</TableCell>
         <TableCell align="center">{formatTimestamp(value.emptiedLast)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Bin History
              </Typography>
              <Table size="small" aria-label="last emptied,fill-levels and humidity">
                <TableHead>
                  <TableRow>
                    <TableCell>Fill level</TableCell>
                    <TableCell>Fill level date</TableCell>
                    <TableCell>Humidity</TableCell>
                    <TableCell>Humidity date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    value.fillLevels.map((level) =>(
                      <TableRow key={`${level.value}-${level.dateTime}`}>
                        <TableCell>{level.value}</TableCell>
                        <TableCell>{formatDate(level.dateTime)}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
    // <TableRow className="table-body-row">
    //   <TableCell>
    //     <IconButton
    //       aria-label="expand row"
    //       size="small"
    //       onClick={() => setOpen(!open)}
    //     >
    //       {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
    //     </IconButton>
    //   </TableCell>
    //   <TableCell align="center">{value.id}</TableCell>
    //   <TableCell align="center">{value.latitude}</TableCell>
    //   <TableCell align="center">{value.longitude}</TableCell>
    //   <TableCell align="center">{value.capacity}</TableCell>
    //   <TableCell align="center">{value.fillThreshold}</TableCell>
    //   <TableCell align="center">{formatTimestamp(value.emptiedLast)}</TableCell>
    // </TableRow>
  );
}

export { HistoryTable };
