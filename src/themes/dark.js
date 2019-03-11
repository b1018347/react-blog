import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from '@material-ui/core/colors/blueGrey';

export default createMuiTheme({
  palette: {
    primary: blueGrey,
    type: "dark"
  },
  typography: { useNextVariants: true }
});
