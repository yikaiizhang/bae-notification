import styles from "./BookList.module.css";
import classNames from "classnames";

export default function BookList({ books }) {
  function handleMouseMove(e) {
    const link = e.currentTarget.children[0];
    link.style.zIndex = 1;
    link.children[1].style.display = "initial";
    link.children[1].style.left = `${
      e.clientX - link.getBoundingClientRect().x + 50
    }px`;
    link.children[1].style.top = `-200px`;
    // link.children[1].style.transform = "scale(1)";
  }

  function handleMouseLeave(e) {
    const link = e.currentTarget.children[0];
    link.style.zIndex = 0;
    link.children[1].style.display = "none";
    link.children[1].style.left = 0;
    link.children[1].style.top = 0;
    // link.children[1].style.transform = "scale(0)";
  }
  return (
    <ul className='list'>
      {books.map((book, index) => (
        <li
          key={index}
          className={classNames("list-item", styles.listItem)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href={book.link}
            target='_blank'
            rel='noopener noreferrer'
            className={classNames("w-full relative", styles.link)}
          >
            <span>{book.name}</span>
            <div className={styles.hoverReveal}>
              <div className={styles.hoverInner}>
                <img
                  src={book.cover.url}
                  alt={book.name}
                  className={styles.hoverImage}
                />
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
