import React from "react";
import { Link } from "react-router-dom";

const BookTile = (props) => {
  // debugger

  return (
    <div className="book-tile callout">
      <Link to="/api/v1/books/${id}">
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>
      </Link>
  </div>
  );
};

export default BookTile;
