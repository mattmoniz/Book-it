import React from "react";
import { Link } from "react-router-dom";

const BookTile = (props) => {

  return (
    <div className="book-tile callout">
        <img src={props.book}  height="200" width="200"></img>
    </div>
  );
};

export default BookTile;
