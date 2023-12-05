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
  Box,
  TableFooter,
  TablePagination,
} from "@mui/material";

import "../../styles/Analytics_css/HistoryTable.css";
import { useBins } from "../../contexts/BinContext";
import {
  FirstPage,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  LastPage,
} from "@mui/icons-material";

import { Spinner } from "../../components/Spinner";
import { TablePaginationActions } from "./TablePaginationActions";

function HistoryTable() {
  const { bins, isLoading } = useBins();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            {/* table headin */}
            <TableHead className="table-heading">
              <TableRow>
                <TableCell />
                <TableCell>Bin Id</TableCell>
                <TableCell align="center">Latitude</TableCell>
                <TableCell align="center">Longitude</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Fill Threshold</TableCell>
              </TableRow>
            </TableHead>

            {/* table body */}
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

function Row({ value }) {
  const [open, setOpen] = useState(false);

  return (
    <TableRow sx={{ "& > *": { borderBottom: "1px" } }}>
      <TableCell>
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
    </TableRow>
  );
}

export { HistoryTable };
