import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BookShowTile from "../components/BookShowTile";

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
        setBook(body);
        setUser(body.user)
        // debugger
      })
    };

    useEffect(() => {
      fetchBookData();
    }, []);


    const onSubmit = (event) => {
      event.preventDefault();
        let payload = {
          review: {
            title: book.title,
            authors: book.authors,
            Description: book.description,
            isbn: book.isbn,
            user_id: User.id,
            book_id: book.id
          }
        };
        fetch(`/api/v1/books`, {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response;
            }
          })
          .then((response) => response.json())
          .then((body) => {
            props.rerender(body)
            setReviewRecord({
              rating: "",
              review: ""
             })
          })
          .catch((error) => console.error(`Error in fetch: ${error.message}`));
    };


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
