import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const BookShowTile = (props) => {

  const [bookRecord, setBookRecord] = useState({});

  const handleChange = (event) => {
  setBookRecord({
    ...bookRecord,
    [event.currentTarget.id]: event.currentTarget.value,
  });
};

const onSubmit = (event) => {
    event.preventDefault();

      let formPayload = {
        book: bookRecord,
      };
      fetch("/api/v1/books", {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(formPayload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
        }
        })
        .then((response) => response.json())
        .then((body) => {
          let newBook = body.book;
          setNewRecord(newPodcast);
          // setShouldRedirect(true);
        })
  };


  return (
    <div className="book-tile callout">
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>
          <p> Description: {props.description}</p>
          <input className="button center" type="submit" value="Add to Bookshelf"/>
  </div>
  );
};

export default BookShowTile;
