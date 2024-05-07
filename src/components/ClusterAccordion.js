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
import { find_cluster_couples } from "./ClusterUtils";
import { ComponentsPalette } from "../Colors";

const get_bg_color = (cluster_side) => {
  return cluster_side === "client"
    ? ComponentsPalette.ClusterClient
    : ComponentsPalette.ClusterServer;
}

const ClusterSide = ({ cluster_couple, cluster_side }) => {
  const cluster = cluster_couple.side(cluster_side);

  if (cluster) {
    return <ClusterSideDetails
      cluster={cluster}
      merged_cluster_commands={cluster_couple.merged_commands}
    />
  }

  return <AbsentClusterSideDetails cluster_side={cluster_side} />
}

const ClusterSideDetails = ({ cluster, merged_cluster_commands }) => {
  const bg_color = get_bg_color(cluster.side);

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

const AbsentClusterSideDetails = ({ cluster_side }) => {
  return (
    <Paper
      elevation={1}
      square={false}
      sx={{
        backgroundColor: get_bg_color(cluster_side),
      }}
    >
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          No {capitalCase(cluster_side)} side
        </Typography>
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

const ClusterCoupleDetails = ({ cluster_couple }) => {
  return (
    <Box sx={{ width: "90%" }} m="auto">
      <ClusterMetadata
        cluster_code={cluster_couple.code}
        cluster_description={cluster_couple.description}
      />
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="stretch"
      >
        <Grid item xs={12} xl={6}>
          <ClusterSide cluster_couple={cluster_couple} cluster_side="client" />
        </Grid>
        <Grid item xs={12} xl={6}>
          <ClusterSide cluster_couple={cluster_couple} cluster_side="server" />
        </Grid>
      </Grid>
    </Box>
  );
};

// Render a single cluster
// Takes in a list of clusters with same name and code but different side
const ClusterCouple = ({ cluster_couple }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor: ComponentsPalette["AccordionHeader"] }}
      >
        <Typography variant="h3">{cluster_couple.name} cluster</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: ComponentsPalette["AccordionBody"] }}>
        <ClusterCoupleDetails cluster_couple={cluster_couple} />
      </AccordionDetails>
    </Accordion>
  );
};
const ClustersAccordion = ({ all_clusters }) => {
  // Make sure all clusters have same name and code but different side
  const cluster_couples = find_cluster_couples(all_clusters);

  return (
    <div>
      {
        cluster_couples.map((cluster_couple, index) =>
          <ClusterCouple key={index} cluster_couple={cluster_couple} />)
      }
    </div>
  );
};

export default ClustersAccordion;
