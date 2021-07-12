import CardLayout from "../CardLayout/CardLayout";
import BookList from "./BookList";

export default function Books({ books }) {
  return (
    <CardLayout
      title='Reading List'
      category='Learning'
      width='3xl:w-4/12 lg:w-6/12 w-full'
    >
      <div>
        <BookList books={books} />
      </div>
    </CardLayout>
  );
}
