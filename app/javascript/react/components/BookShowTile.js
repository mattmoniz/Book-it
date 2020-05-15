import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = props => {

  return (
    <div className="book-show-tile">
      <br></br>
      <img src={props.bookCover} height="200" width="200"></img>
      <div classname ="callout book-show-tile">
        <br></br>
        <div className = "callout">
        <p> <b>Title:</b> {props.title}</p>
        <p> <b>Authors:</b> {props.authors}</p>
        <p> <b>Published Date:</b> {props.publishedDate}</p>
        <p> <b>Book Category:</b> {props.bookCategory}</p>
        <p> <b>Description:</b> {props.description}</p>
        </div>
      </div>
      <div className="button-group">
        <input
          className="bookshowtile button"
          type="submit"
          value="Add to Library"
          onClick={props.fetchBookInfo}
        />
      <Link to="/books" className="bookshowtile button">
          Return to Search
        </Link>
        <Link to={`/users/${props.userId}`} className="bookshowtile button">
            Go to Your Library
          </Link>

      </div>
    </div>
  );
};

export default BookShowTile;
