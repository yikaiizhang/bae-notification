import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: 400,
    overflow: "auto",
  },
});

export default function BookList({ books, setBook }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {books.map((book, index) => (
        <ListItem
          key={index}
          divider
          button
          onClick={() => {
            setBook(book);
          }}
        >
          <ListItemText primary={book.name}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
