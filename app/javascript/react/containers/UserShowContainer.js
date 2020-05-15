import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTile from "../components/UserTile";

const UserShowContainer = props => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAllBookData();
  }, []);

  const id = props.match.params.id;
  const fetchAllBookData = () => {
    fetch(`/api/v1/users/${id}`)
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        setBooks(body.user.libraries);
      });
  };

  let deleteClick = (event, book_id) => {
    event.preventDefault();
    book_id = event.currentTarget.id;
    fetch(`/api/v1/books/${book_id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setBooks(body.user.libraries);
      })

      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  let bookList;
  if (books.length === 0) {
    bookList = <></>;
  } else {
    bookList = books.map(book => {
      return (
        <UserTile
          key={book.book.id}
          id={book.book.id}
          description={book.book.description}
          title={book.book.title}
          authors={book.book.authors}
          bookCover={book.book.img_url}
          isbn={book.book.isbn}
          publishedDate={book.book.published_date}
          pageCount={book.book.page_count}
          bookCategory={book.book.book_category}
          bookIdGoogleBooks={book.book.book_id_google_books}
          deleteClick={deleteClick}
        />
      );
    });
  }

  return (
    <div className="grid-container">
      <br></br>
      <div className="small-block-grid-3">{bookList}</div>
    </div>
  );
};

export default UserShowContainer;
