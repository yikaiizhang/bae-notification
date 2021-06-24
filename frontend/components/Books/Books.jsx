import { useState, useEffect } from "react";
import { useBooks } from "../../hooks";
import CardLayout from "../CardLayout";
import BookList from "./BookList";
import Book from "./Book";
import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  books: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "460px",
  },
});

export default function Books() {
  const classes = useStyles();
  const { books, isLoading, isError } = useBooks();
  const [book, setBook] = useState();

  useEffect(() => {
    if (books) {
      setBook(books[0]);
    }
  }, [books]);

  if (isLoading) return <Skeleton variant='rect' width={870} height={585} />;
  if (isError) return <div>Failed to load.</div>;

  return (
    <CardLayout title='Reading List' category='Learning'>
      <div className={classes.books}>
        <BookList books={books} setBook={setBook} />
        <Book book={book} />
      </div>
    </CardLayout>
  );
}
