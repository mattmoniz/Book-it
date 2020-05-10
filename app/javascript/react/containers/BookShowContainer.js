import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BookShowTile from "../components/BookShowTile";

const BookShowContainer = props => {
// debugger

  const [book, setBook] = useState({});

  // debugger


const id = props.match.params.id;


  const fetchBookData = () => {
    fetch(`/api/v1/books/${id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        }})
      .then((response) => response.json())
      .then((body) => {
        setBook(body);

      })
    };

    useEffect(() => {
      fetchBookData();
    }, []);


  return (
    <div className="grid-container">
      <div className="grid-x">

          <BookShowTile
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            description={book.description}
            isbn={book.isbn}
            bookCover={book.img_url}
          />

      </div>
    </div>
  );
};

export default BookShowContainer;
