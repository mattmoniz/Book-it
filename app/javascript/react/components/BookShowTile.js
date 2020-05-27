import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = props => {

  let BookReviewHeading = `Book Reviews for ${props.title} courtesy of GoodReads.`

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

      <div>
        <h4> {BookReviewHeading} </h4>
        <iframe
          id="the_iframe"
          src={props.goodReadsIframeSrc}
          width="1200"
          height="400"
          frameBorder="0">
        </iframe>
      </div>
      <br></br>

        <input
          className="bookshowtile button"
          type="submit"
          value="Add to Library"
          onClick={props.fetchBookInfo}
        />

      <br></br>

      <Link to="/books"
        className="bookshowtile button">
          Return to Search
        </Link>

        <br></br>

      <Link to={`/users/${props.userId}`}
        className="bookshowtile button">
          Go to Your Library
      </Link>

    </div>
  );
};

export default BookShowTile;
