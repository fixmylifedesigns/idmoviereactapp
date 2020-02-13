import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0
    // paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState();
  const movie = {
    title: props.post.title,
    movie_id: props.post.id,
    overview: props.post.overview,
    vote_count: props.post.vote_count,
    poster_path: "http://image.tmdb.org/t/p/w342" + props.post.poster_path,
    release_date: props.post.release_date
  };
  // console.log(movie);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToFavortie = () => {
    axios
      .post("https://iqmoviedb.herokuapp.com/api/newmovie", movie)
      .then(res => {
        console.log(res.data);
        setAdded("Added to favorites");
      })
      .catch(err => {
        console.log(err);
        setAdded("Already in favorites");
      });
  };

  const deleteFromFav = () => {
    axios
      .delete(`https://iqmoviedb.herokuapp.com/api/${props.post.id}`)
      .then(res => {
        console.log(res);
        props.setRefresh(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card className={classes.root}>
      <div style={{ height: "500px", overflow: "hidden", zIndex: 0 }}>
        {props.moviedb ? (
          <img
            src={"http://image.tmdb.org/t/p/w342" + props.post.poster_path}
          />
        ) : (
          <img src={props.post.poster_path} />
        )}
      </div>
      <h3>{props.post.title}</h3>
      <p>{"Release Date " + props.post.release_date}</p>
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          width: "345px",
          // background: "red",
          color: "white",
          // frontSize: "30px"
        }}
      >
        <h3        style={{
          background: "red",
          color: "white",
        }}>{added}</h3>
      </div>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.moviedb ? (
          <IconButton aria-label="add to favorites" onClick={addToFavortie}>
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete from favorites"
            onClick={deleteFromFav}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>{" "}
      <Collapse in={expanded} timeout="auto" unmountOnExit style={{}}>
        <CardContent>
          <Typography paragraph>Overview:</Typography>
          <Typography paragraph>{props.post.overview}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
