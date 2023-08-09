// DeviceTemplate.js
import * as React from "react";
import Device from "../components/Device";
import TopBar from "../components/TopBar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../theme";

const DeviceTemplate = ({ pageContext }) => {
  const deviceData = pageContext.deviceData;
  const product_name = pageContext.product_name;

  const title = `ZCL API documentation for ${product_name}`;

  console.log("Page context: ", pageContext);

  return (
    <ThemeProvider theme={theme}>
      <TopBar title={title} />
      <Device
        product_name={product_name}
        deviceZapDescriptor={deviceData.childDescriptorsJson}
      />
    </ThemeProvider>
  );
};

export default DeviceTemplate;
