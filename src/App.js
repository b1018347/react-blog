import React, { Component } from "react";
import { compose } from "redux";
import { withFirebase } from "components/firebase/context";
import Header from "components/UI/Header";
import Grid from "@material-ui/core/Grid";
import BlogCard from "components/UI/BlogCard";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '100px auto',
    [theme.breakpoints.up("lg")]: {
      width: 1170
    },
  }
});

class App extends Component {
  state = {
    blogs: [],
    order: 'asc'
  };

  componentDidMount() {
    this.props.firebase
      .blogs()
      // .orderByChild("deleted")
      // .equalTo(false)
      .on("value", snapshot => {
        console.log(snapshot.val());
        this.setState({
          blogs: snapshot.val()
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <Grid container className={classes.root}>
          <Grid
            container
            spacing={16}
          >
            {Object.keys(this.state.blogs).reverse().map((blog, index) => {
              return (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <BlogCard blog={this.state.blogs[blog]} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(styles)
)(App);
