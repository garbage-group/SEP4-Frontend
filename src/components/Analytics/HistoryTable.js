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

import "../../styles/Analytics_css/HistoryTable.css";
import { useBins } from "../../contexts/BinContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { TablePaginationAction } from "../utils/TablePaginationAction";
import {Spinner} from "../utils/Spinner";

//format date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

// HistoryTable component
function HistoryTable() {
  // Fetch bins data and loading state from context
  const { bins, isLoading } = useBins();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currOpen, setCurrOpen] = useState(null);

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
              ).map((bin, index) => (
                <Row
                  key={bin.id}
                  value={bin}
                  index={index}
                  currOpen={currOpen}
                  setCurrOpen={setCurrOpen}
                />
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
                ActionsComponent={TablePaginationAction}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

// Row component for rendering each row in the table
function Row({ value, index, currOpen, setCurrOpen }) {
  let isOpen = currOpen === index;

  // Function to format timestamp or return "N/A" if null
  const formatTimestamp = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const handleAccordionToggle = () => {
    setCurrOpen(isOpen ? null : index);
  };

  return (
    <>
      <TableRow
        className="table-body-row"
        sx={{ "& > *": { borderBottom: "0px" } }}
        colSpan={7}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleAccordionToggle}
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{value.id}</TableCell>
        <TableCell align="center">{value.latitude}</TableCell>
        <TableCell align="center">{value.longitude}</TableCell>
        <TableCell align="center">{value.capacity}</TableCell>
        <TableCell align="center">{value.fillThreshold}</TableCell>
        <TableCell align="center">
          {formatTimestamp(value.emptiedLast)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          colSpan={7}
          sx={{
            backgroundColor: "#EAEBF4",
          }}
        >
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Bin {value.id}'s History
              </Typography>
              <Table
                size="small"
                aria-label="last emptied,fill-levels and humidity"
              >
                {/* fill level */}
                <TableHead>
                  <TableRow>
                    <TableCell>Fill level</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.fillLevels.map((level) => (
                    <TableRow key={level.dateTime}>
                      <TableCell>{level.value}</TableCell>
                      <TableCell>{formatDate(level.dateTime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {/* humidity */}
                <TableHead>
                  <TableRow>
                    <TableCell>Humidity</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.humidity.map((level) => (
                    <TableRow key={level.dateTime}>
                      <TableCell>{level.value}</TableCell>
                      <TableCell>{formatDate(level.dateTime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {/* temperature */}
                <TableHead>
                  <TableRow>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.temperatures.map((temp) => (
                    <TableRow key={temp.dateTime}>
                      <TableCell>{temp.value}</TableCell>
                      <TableCell>{formatDate(temp.dateTime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export { HistoryTable };
