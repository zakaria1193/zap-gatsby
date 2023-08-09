import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { capitalCase } from "capital-case";

const AttributeTable = ({ attributes }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Attributes
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Attributes Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Default Value</TableCell>
              <TableCell>Reportable</TableCell>
              <TableCell>Storage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes.map((attribute, index) => (
              <TableRow key={index}>
                <TableCell>{capitalCase(attribute.name)}</TableCell>
                <TableCell>
                  0x{attribute.code.toString(16).toUpperCase()}
                </TableCell>
                <TableCell>{attribute.type}</TableCell>
                <TableCell>{attribute.defaultValue}</TableCell>
                <TableCell>{attribute.reportable}</TableCell>
                <TableCell>{attribute.storageOption}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttributeTable;
