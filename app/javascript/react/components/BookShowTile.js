import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = props => {
      // debugger
      let good_reads_src = `https://www.goodreads.com/api/reviews_widget_iframe?did=DEVELOPER_ID&amp;format=html&amp;isbn=${props.isbn}&amp;links=660&amp;review_back=fff&amp;stars=000&amp;text=000`
      debugger
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

      <html>
      <iframe
        id="the_iframe"
        src={good_reads_src}
        width="565"
        height="400"
        frameborder="0">
      </iframe>
      </html>

    </div>
  );
};

export default BookShowTile;
