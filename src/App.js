import React, { Component } from "react";
import { compose } from 'redux'
import { withFirebase } from "components/firebase/context";
import Header from "components/UI/Header";
import Grid from "@material-ui/core/Grid";
import Blog from "components/UI/Blog";
import { withStyles } from "@material-ui/core";


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '100px'
  },
  paper: {
    height: 140,
    width: 100,
  }
});

class App extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    this.props.firebase
      .blogs()
      .orderByChild("deleted")
      .equalTo(false)
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
        <Grid container className={classes.root} >
          {Object.keys(this.state.blogs).map((blog, index) => {
            return (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
                <Blog blog={this.state.blogs[blog]} />
              </Grid>
            );
          })}
        </Grid>
        <ul />
      </div>
    );
  }
}

export default compose(withFirebase, withStyles(styles))(App);
