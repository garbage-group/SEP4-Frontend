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
} from "@mui/material";

import "../../styles/Analytics_css/HistoryTable.css";
import { useBins } from "../../contexts/BinContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { Spinner } from "../../components/Spinner";

function HistoryTable() {
  const { bins, isLoading } = useBins();
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
              {bins.map((bin) => (
                <Row key={bin.id} value={bin} />
              ))}
            </TableBody>
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
