import React from "react";
import { Link } from "react-router-dom";

const BookTile = props => {
  return (
    <div className="callout book-tile">

      <Link to={`/books/${props.id}`}>
        <img src={props.bookCover} height="100" width="200"></img>
        <p className="booktile" > <b>Title: </b>{props.title}</p>
        <p className="booktile"> <b>Authors: </b>{props.authors}</p>
        <p className="booktile"> <b>Published Date: </b> {props.publishedDate}</p>
        <br></br>
        <br></br>
      </Link>
    </div>
  );
};

export default BookTile;
