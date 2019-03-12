import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles, withTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Switch from "@material-ui/core/Switch";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  list: {
    width: 250
  }
};

const SideMenu = props => {
  const { classes, darkTheme, order } = props;
  
  const sideList = (
    <div className={classes.list}>
      <List>
        {["Home"].map((text, index) => (
          <ListItem component={Link} to="/" button key={text}  onClick={props.toggleMenu}>
            <ListItemIcon>
              {index % 2 === 0 ? <HomeIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Switch
            checked={darkTheme}
            onChange={props.toggleTheme}
            value="dark"
            color="primary"
          />
          <ListItemText primary="Dark mode" />
        </ListItem>
        <ListItem>
          <Switch
            checked={order === 'asc'}
            onChange={props.toggleOrder}
            value="asc"
            color="primary"
          />
          <ListItemText primary="Newest first" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      open={props.open}
      onOpen={props.toggleMenu}
      onClose={props.toggleMenu}
    >

        {sideList}
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(withTheme()(SideMenu));
