import { useEffect, useState } from "react";
import { Book } from "../../App";

function formatTitle(formatTitle: string) {
  let title = formatTitle;
  const words = title.split(" ");

  if (words.length > 6) title = words.slice(0, 6).join(" ") + "...";

  return title;
}

function List({
  queryCompleted,
  books,
}: {
  queryCompleted: Boolean;
  books: Book;
}) {
  const [list, setList] = useState<JSX.Element[] | JSX.Element>([]);

  useEffect(() => {
    if (books.numFound && books.docs && books.numFound > 0) {
      // search by title/author
      setList(
        books.docs.map((book, idx) => {
          if (
            book.title &&
            book.author_name &&
            book.first_publish_year &&
            book.publish_year.length > 0
          ) {
            return (
              <li key={idx} className="book-card">
                <img src="/book-cover1.webp" alt="book-cover1" />
                <p>
                  <span>{formatTitle(book.title)}</span>
                  <br />
                  <span>
                    by <em>{book.author_name[0]}</em>
                  </span>
                </p>
                <p>
                  <span>First Published: {book.first_publish_year} </span>
                  <br />
                  <span>Last Published: {Math.max(...book.publish_year)}</span>
                </p>
              </li>
            );
          } else {
            return (
              <li key={idx} className="book-card">
                <img src="/book-cover1.webp" alt="book-cover" />
                <p>
                  <span>Lorem ipsum dolor sit amet</span> <br />
                  <span>
                    by <em>Neque Convalli</em>
                  </span>
                </p>
                <p>
                  <span>First Published: 1776</span>
                  <br />
                  <span>Last Published: 2023</span>
                </p>
              </li>
            );
          }
        })
      );
    } else if (books.work_count && books.works && books.work_count > 0) {
      // search by subject
      setList(
        books.works.slice(0, 10).map((book, idx) => {
          if (
            book.title &&
            book.authors.length > 0 &&
            book.first_publish_year
          ) {
            return (
              <li key={idx} className="book-card">
                <img src="/book-cover1.webp" alt="book-cover" />
                <p>
                  <span>{formatTitle(book.title)}</span> <br />
                  <span>
                    by <em>{" " + book.authors[0].name}</em>
                  </span>
                </p>
                <p>First Published: {book.first_publish_year} </p>
              </li>
            );
          } else {
            return (
              <li key={idx} className="book-card">
                <img src="/book-cover1.webp" alt="book-cover" />
                <p>
                  <span>Lorem ipsum dolor sit amet</span> <br />
                  <span>
                    by <em>Neque Convalli</em>
                  </span>
                </p>
                <p>
                  <span>First Published: 1776</span>
                </p>
              </li>
            );
          }
        })
      );
    } else if (queryCompleted) {
      setList(<h1>Not Found, try search a different book or subject</h1>);
    }
  }, [books]);

  return <>{list}</>;
}

export default List;
