import { createTheme } from "@mui/material";

const color = "#E0E3E7";

export const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color
        }
      }
    }
  }
});