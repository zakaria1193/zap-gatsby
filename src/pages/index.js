import React from "react";
import { graphql, Link } from "gatsby";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../theme";

import Box from "@mui/material/Box";
import TopBar from "../components/TopBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsRemoteTwoToneIcon from "@mui/icons-material/SettingsRemoteTwoTone";
import { StrictMode } from "react";

const DevicesList = ({ devices_files }) => {
  console.log("Devices files: ", devices_files);

  return (
    <List>
      {devices_files.map((device, index) => {
        const device_name = device.base.replace(".json", "");
        return (
          <ListItem key={index}>
            <ListItemIcon>
              <SettingsRemoteTwoToneIcon />
            </ListItemIcon>
            <ListItemButton component={Link} to={`/device/${device_name}`}>
              <ListItemText primary={device_name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

const IndexPage = ({ data }) => {
  const devices_files = data.allFile.nodes;
  const title = "Zcl documentation devices list";

  return (
    <ThemeProvider theme={theme}>
      <StrictMode>
        <Box>
          <TopBar title={title} />
          <DevicesList devices_files={devices_files} />
        </Box>
      </StrictMode>
    </ThemeProvider>
  );
};

export const query = graphql`
  query {
    allFile {
      nodes {
        base
      }
    }
  }
`;

export default IndexPage;
