import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React from "react";

const styles = {
  list: {
    width: 250
  }
};

const SideMenu = props => {
  const { classes } = props;
  const sideList = (
    <div className={classes.list}>
      <List>
        {["Home", "About"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <HomeIcon/> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <SwipeableDrawer open={props.open} onOpen={props.toggleMenu} onClose={props.toggleMenu}>
      <div
        tabIndex={0}
        role="button"
        onClick={props.toggleMenu}
        onKeyDown={props.toggleMenu}
      >
        {sideList}
      </div>
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(SideMenu);
