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

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { GetCommandDescription } from "./ZapDbReader/GetCluster";

const CommandRow = ({ command, index, cluster_code, cluster_side }) => {
  let client_cell = "-";
  let server_cell = "-";
  let direction_cell = "-";

  switch (cluster_side) {
    case "client":
      switch (command.source) {
        case "client":
          client_cell = "OUT";
          direction_cell = ">>";
          break;

        case "server":
          client_cell = "IN";
          direction_cell = "<<";
          break;

        default:
          throw new Error("Command source is not defined");
      }
      break;

    case "server":
      switch (command.source) {
        case "client":
          server_cell = "IN";
          direction_cell = ">>";
          break;

        case "server":
          server_cell = "OUT";
          direction_cell = "<<";
          break;

        default:
          throw new Error("Command source is not defined");
      }
      break;

    default:
      throw new Error("Cluster side is not defined");
  }

  /* if (client_cell === "OUT" || server_cell === "OUT") { */
  /*   console.assert(command.outgoing, "Command is inconsistent : ", command); */
  /* } else if (client_cell === "IN" || server_cell === "IN") { */
  /*   console.assert(command.incoming, "Command is inconsistent : ", command); */
  /* } */

  const command_desc = GetCommandDescription(cluster_code, command.code);

  return (
    <TableRow key={index}>
      <TableCell>{client_cell}</TableCell>
      <TableCell>{direction_cell}</TableCell>
      <TableCell>{server_cell}</TableCell>
      <TableCell>{command.name}</TableCell>
      <TableCell>0x{command.code.toString(16).toUpperCase()}</TableCell>
      <TableCell>{command_desc}</TableCell>
    </TableRow>
  );
};

// Expects commands from both side server and client,
// including incoming and outgoing
const CommandsTable = ({ commands, cluster_code, cluster_side }) => {
  if (!commands || commands.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          No commands
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Commands
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Commands Table">
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell> - </TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commands && commands.map((command, index) => (
              <CommandRow
                key={index}
                command={command}
                cluster_code={cluster_code}
                cluster_side={cluster_side}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommandsTable;
