import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import BookShowTile from "../components/BookShowTile";

const BookShowContainer = props => {
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});

const id = props.match.params.id;
  const fetchBookData = () => {
    fetch(`/api/v1/books/${id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        }})
      .then((response) => response.json())
      .then((body) => {
        setBook(body.book);
        setUser(body.book.user)
      })
    };

      const bookShowInfo = books.map(bookData => {
        return (
          <BookShowTile
            key={bookData.id}
            title={bookData.title}
            authors={bookData.authors}
            description={bookData.description}
            isbn={bookData.isbn}
            bookCover={bookData.img_url}
          />
        );
      });

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="small-3 rows">
          {bookInfo}
        </div>
      </div>
    </div>
  );
};

export default BookShowContainer;
