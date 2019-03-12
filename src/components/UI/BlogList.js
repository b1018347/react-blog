import React from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from "components/UI/BlogCard";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "0 auto",
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  }
});

const BlogList = props => {
  const { classes, blogs, order } = props;

  const renderBlogs = () => {
    const blogList = Object.keys(blogs)
      .map((blog, index) => {
        return (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <BlogCard blog={blogs[blog]} />
          </Grid>
        );
      });
      return order === 'asc' ? blogList.reverse() : blogList ;
  };

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={16}>
        {renderBlogs()}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BlogList);
