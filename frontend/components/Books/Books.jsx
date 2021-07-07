import { useState, useEffect } from "react";
import CardLayout from "../CardLayout/CardLayout";
import BookList from "./BookList";
import Book from "./Book";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  books: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "460px",
  },
});

export default function Books({ books }) {
  const classes = useStyles();
  const [book, setBook] = useState();

  useEffect(() => {
    if (books) {
      setBook(books[0]);
    }
  }, [books]);

  return (
    <CardLayout
      title='Reading List'
      category='Learning'
      width='3xl:w-4/12 lg:w-6/12 md:w-full'
    >
      <div className={classes.books}>
        <BookList books={books} setBook={setBook} />
        <Book book={book} />
      </div>
      <h2 className='text-2xl'>Title test</h2>
      <p className='text-black'>tailwind test</p>
    </CardLayout>
  );
}
