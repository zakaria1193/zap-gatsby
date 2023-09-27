import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import ClustersAccordion from "../components/ClusterAccordion"; // Adjust the path based on your project structure
import EndpointMetadata from "../components/EndpointMetadata.js";

// Look for endpoint.id that is at same index in endpointTypes array
function getEndpointId(deviceZapDescriptor, endpointIndex) {
  const endpoint = deviceZapDescriptor.endpointTypes[endpointIndex];
  return deviceZapDescriptor.endpoints[endpointIndex].endpointId;
}

const Endpoint = ({ endpoint, deviceZapDescriptor, index }) => {
  return (
    <Box sx={{ padding: (theme) => theme.spacing(2) }}>
      <Typography variant="h2" align="center" gutterBottom>
        Endpoint {getEndpointId(deviceZapDescriptor, index)}
      </Typography>
      <EndpointMetadata endpoint_metadata={endpoint.deviceTypeRef} />
      {/* Map through the cluster list */}
      <ClustersAccordion all_clusters={endpoint.clusters} />
    </Box>
  );
};

const Device = ({ product_name, deviceZapDescriptor }) => {
  console.log(
    `Device: ${product_name} fetched with descriptor: ${deviceZapDescriptor}`
  );
  return (
    <Box sx={{ padding: (theme) => theme.spacing(2) }}>
      {deviceZapDescriptor.endpointTypes.map((endpoint, index) => (
        <Endpoint
          key={index}
          endpoint={endpoint}
          deviceZapDescriptor={deviceZapDescriptor}
          index={index}
        />
      ))}
    </Box>
  );
};

export default Device;
