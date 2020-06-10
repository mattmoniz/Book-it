import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import BookShowTile from "../components/BookShowTile";
import UserShowContainer from "./UserShowContainer";

const BookShowContainer = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [book, setBook] = useState({});
  const [user, setUser] = useState({
    user_id: "",
    user_email: ""
  });

const id = props.match.params.id;
  const fetchBookData = () => {
    fetch(`/api/v1/books/${id}`)
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        setBook(body);
        setUser({ user_id: body.user_id, user_email: body.user_email });
      });
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    let payload = {
      id: book.id,
      title: book.title,
      authors: book.authors,
      description: book.description,
      isbn: book.isbn,
      img_url: book.img_url,
      published_date: book.published_date,
      page_count: book.page_count,
      book_category: book.book_category,
      book_id_google_books: book.book_id_google_books,
      nyt_book_review: book.nyt_book_review,
      book_id: book.id,
      user_id: user.user_id,
      goodReadsReviews: book.goodreads_reviews,
      goodreads_iframe_src: book.goodreads_iframe_src
    };
    fetch(`/api/v1/books`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        setShouldRedirect(true);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to={`/users/${user.user_id}`} />;
  }

  return (
    <div className="grid-container BookShow">
      <div className="grid-x">
        <BookShowTile
          key={book.id}
          id={book.id}
          userId={user.user_id}
          title={book.title}
          authors={book.authors}
          description={book.description}
          isbn={book.isbn}
          bookCover={book.img_url}
          publishedDate={book.published_date}
          pageCount={book.page_count}
          bookCategory={book.book_category}
          bookIdGoogleBooks={book.book_id_google_books}
          nytBookReview={book.nyt_book_review}
          fetchBookInfo={onSubmit}
          goodReadsReviews={book.goodreads_reviews}
          goodReadsIframeSrc={book.goodreads_iframe_src}
        />
      </div>
    </div>
  );
};

export default BookShowContainer;
