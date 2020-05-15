import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = props => {

  return (
    <div className="book-show-tile">
      <br></br>
      <img src={props.bookCover} height="300" width="300"></img>
      <div className ="callout book-show-tile">
        <br></br>
        <div className = "google-show-info">
          <p> <b>Title:</b> {props.title}</p>
          <p> <b>Authors:</b> {props.authors}</p>
          <p> <b>Published Date:</b> {props.publishedDate}</p>
          <p> <b>Book Category:</b> {props.bookCategory}</p>
          <p> <b>Description:</b> {props.description}</p>
        </div>
        <div className = "nyt-book-review">
          <p> <b>NYT Book Review:</b> {props.nytBookReview}</p>
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
