import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  media: {
    height: 250
  },
  cardContent: {
    height: 50,
    overflow: "hidden"
  }
};

function BlogCard(props) {
  const { classes, blog } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={blog.image}
          title={blog.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography>{new Date(blog.created).toDateString()}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          to={`/${blog.id}`}
          size="small"
          color="primary"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(BlogCard);
