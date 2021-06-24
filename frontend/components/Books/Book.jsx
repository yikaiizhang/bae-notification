import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "400px",
    textAlign: "center",
  },
  bookImage: {
    height: "300px",
    boxShadow: "5px 0 35px rgba(0,0,0,0.1)",
    margin: "0 auto 20px",
  },
  bookNotes: {
    marginTop: 10,
  },
});

export default function Book({ book }) {
  const classes = useStyles();
  if (book) {
    return (
      <div className={classes.root}>
        <a href={book.link} target='_blank' rel='noopener noreferrer'>
          <img
            className={classes.bookImage}
            src={book.cover.url}
            alt={book.name}
          />
        </a>
        <Typography gutterBottom variant='h5' component='h2'>
          {book.name}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {book.author}
        </Typography>
        {book.notes ? (
          <Typography
            variant='caption'
            color='textSecondary'
            component='p'
            className={classes.bookNotes}
          >
            {book.notes}
          </Typography>
        ) : null}
      </div>
    );
  } else {
    return <div>No book</div>;
  }
}
