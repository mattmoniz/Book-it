import React from "react";
import { Link } from "react-router-dom";

const BookTile = (props) => {

  return (
    <div className="book-tile callout">
        <img src={props.bookCover}  height="200" width="200"></img>
        <ul>
          <li> Title: {props.title}</li>
          <li> Authors: {props.authors}</li>
        </ul>
  </div>
  );
};

export default BookTile;
