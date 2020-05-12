import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import BookShowTile from "../components/BookShowTile";
import UserShowContainer from "./UserShowContainer";

const BookShowContainer = props => {
const [shouldRedirect, setShouldRedirect] = useState(false)
const [book, setBook] = useState({});
const [user, setUser] = useState({
  user_id: "",
  user_email: ""
});

const id = props.match.params.id;

  const fetchBookData = () => {
    fetch(`/api/v1/books/${id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        }})
      .then((response) => response.json())
      .then((body) => {
        // debugger
        setBook(body);
        setUser({user_id: body.user_id,
                user_email: body.user_email});
      })
    };

    useEffect(() => {
      fetchBookData();
    }, []);


  const onSubmit = (event) => {

    event.preventDefault();
      let payload = {
          title: book.title,
          authors: book.authors,
          description: book.description,
          isbn: book.isbn,
          img_url:book.img_url,
          book_id: book.id,
          // user_id: user.user_id
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
          setShouldRedirect(true)
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };


    if (shouldRedirect) {
        return <Redirect to={`/user/${user.user_id}`}/>
    }

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
            fetchBookInfo={onSubmit}
          />


      </div>
    </div>
  );
};

export default BookShowContainer;
