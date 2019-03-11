import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withFirebase } from "components/firebase/context";
import React, { Component } from "react";
import { compose } from "redux";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
  media: {
    height: 500
  }
};

class Blog extends Component {
  state = {
    blog: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const blogId = this.props.match.params.blogId;
    this.props.firebase
      .blogs()
      .orderByChild("id")
      .equalTo(blogId)
      .on("value", snapshot => {
        const blogs = snapshot.val();
        const [key] = Object.keys(blogs);
        this.setState({ blog: blogs[key] });
      });
  }
  render() {
    const { classes } = this.props;

    return this.state.blog ? (
      <Grid container  direction="row" justify="center" >
        <Grid item xs={12} sm={12} lg={6} xl={4}>
          <Card >
            <CardHeader
              avatar={<Avatar className={classes.avatar}>{process.env.REACT_APP_AUTHOR}</Avatar>}
              title={this.state.blog.title}
              subheader={new Date(this.state.blog.created).toDateString()}
            />
            <CardMedia
              className={classes.media}
              image={this.state.blog.image}
              title={this.state.blog.title}
            />
            <CardContent>
              <Typography component="div">
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.blog.body }}
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/" size="small" color="primary">
                Back
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    ) : null;
  }
}

export default compose(
  withStyles(styles),
  withFirebase
)(Blog);
