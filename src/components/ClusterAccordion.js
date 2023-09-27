import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { capitalCase } from "capital-case";

import AttributesTable from "./AttributesTable";
import CommandsTable from "./CommandsTable";
import { GetClusterDescription } from "./ZapDbReader/GetCluster";
import {
  find_clusters_with_same_name,
  concatenate_cluster_commands,
} from "./ClusterUtils";
import { ComponentsPalette } from "../Colors";

const ClusterSideDetails = ({ cluster, merged_cluster_commands }) => {
  const bg_color =
    cluster.side === "client"
      ? ComponentsPalette.ClusterClient
      : ComponentsPalette.ClusterServer;

  if (!cluster) {
    return (
      <Paper
        elevation={1}
        square={false}
        sx={{
          backgroundColor: bg_color,
        }}
      >
        <Box padding={2}>
          <Typography variant="h4" gutterBottom>
            No {capitalCase(cluster.side)} side
          </Typography>
        </Box>
      </Paper>
    );
  }
  return (
    <Paper
      elevation={1}
      square={false}
      sx={{
        backgroundColor: bg_color,
      }}
    >
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          {capitalCase(cluster.side)} side
        </Typography>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <AttributesTable attributes={cluster.attributes} />
          <CommandsTable
            commands={merged_cluster_commands}
            cluster_code={cluster.code}
            cluster_side={cluster.side}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

const ClusterMetadata = ({ cluster_code, cluster_description }) => {
  return (
    <Box mb={2}>
      <Typography variant="subtitle1">
        ID: {cluster_code}
        <br />
        Description: {cluster_description}
      </Typography>
    </Box>
  );
};

const ClusterDetails = ({ clusters_with_same_name }) => {
  const cluster_code =
    "0x" + clusters_with_same_name[0].code.toString(16).toUpperCase();

  const cluster_description = GetClusterDescription(parseInt(cluster_code, 16));
  const merged_cluster_commands = concatenate_cluster_commands(
    clusters_with_same_name
  );

  const client_side_cluster = clusters_with_same_name.find(
    (cluster) => cluster.side === "client"
  );

  const server_side_cluster = clusters_with_same_name.find(
    (cluster) => cluster.side === "server"
  );

  return (
    <Box sx={{ width: "90%" }} m="auto">
      <ClusterMetadata
        cluster_code={cluster_code}
        cluster_description={cluster_description}
      />
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="stretch"
      >
        <Grid item xs={12} xl={6}>
          <ClusterSideDetails
            cluster={client_side_cluster}
            merged_cluster_commands={merged_cluster_commands}
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <ClusterSideDetails
            cluster={server_side_cluster}
            merged_cluster_commands={merged_cluster_commands}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Render a single cluster
// Takes in a list of clusters with same name and code but different side
const ClusterItem = ({ clusters_with_same_name }) => {
  // Assert all clusters have same name
  const cluster_name = clusters_with_same_name[0].name;

  if (
    !clusters_with_same_name.every((cluster) => cluster.name === cluster_name)
  ) {
    throw new Error("All clusters in same accordion item must have same name");
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor: ComponentsPalette["AccordionHeader"] }}
      >
        <Typography variant="h3">{cluster_name} cluster</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: ComponentsPalette["AccordionBody"] }}>
        <ClusterDetails clusters_with_same_name={clusters_with_same_name} />
      </AccordionDetails>
    </Accordion>
  );
};
const ClustersAccordion = ({ all_clusters }) => {
  // Make sure all clusters have same name and code but different side
  const clusters_lists = find_clusters_with_same_name(all_clusters);
  return (
    <div>
      {clusters_lists.map((cluster_list, index) => (
        <ClusterItem key={index} clusters_with_same_name={cluster_list} />
      ))}
    </div>
  );
};

export default ClustersAccordion;
