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
        // debugger
        setBooks(body.user.libraries);
      });
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
        />
      );
    });
  }



  return (
    <div className="grid-container">
      <div className="small-block-grid-3">{bookList}</div>
    </div>
  );
};

export default UserShowContainer;
