import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const EndpointMetadata = ({ endpoint_metadata }) => {
  if (endpoint_metadata == null) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="EndpointMetadata">
        <TableBody>
          <TableRow>
            <TableCell>Device Type</TableCell>
            <TableCell>{endpoint_metadata.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EndpointMetadata;
