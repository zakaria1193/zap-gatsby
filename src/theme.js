import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ComponentsPalette } from "./Colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: ComponentsPalette["Primary"]["main"],
      light: ComponentsPalette["Primary"]["light"],
    },
    secondary: {
      main: ComponentsPalette["Secondary"]["main"],
      light: ComponentsPalette["Secondary"]["light"],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h3: {
      fontSize: "1.7rem",
      fontWeight: 300,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 300,
    },
  },
});

export default theme;
