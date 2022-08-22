import { createTheme } from '@mui/material/styles';
import { green, pink, purple } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export default (mode: PaletteMode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: pink[400],
    },
    secondary: {
      main: green[500],
    },
  },
});