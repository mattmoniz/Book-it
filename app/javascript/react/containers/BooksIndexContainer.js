import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookTile from "../components/BookTile";
import NytBooksListContainer from "./NytBooksListContainer";

const BooksIndexContainer = props => {
  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState({
    searchString: ""
  });
  const [user, setUser] = useState({});

  const fetchUserData = () => {
    fetch("/api/v1/books")
      .then(response => response.json())
      .then(userInfo => {
        setBooks(userInfo.user_books);
        setUser(userInfo);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = event => {
    setBookSearch({
      searchString: event.currentTarget.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch("/api/v1/books/search", {
      method: "POST",
      body: JSON.stringify(bookSearch),
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
        setBooks(body);
        setUser(user);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  let indexHeader = "";
  if (!bookSearch.searchString && books.length == 0) {
    indexHeader = "Your Library is empty, let's add some books!";
  } else if (books.length > 0) {
    indexHeader = "Your Current Library";
  } else if (handleSubmit) {
    indexHeader = "Your Search Results";
  }

  let bookInfo;
  if (books != null) {
    bookInfo = books.map(bookData => {
      return (
        <BookTile
          key={bookData.id}
          id={bookData.id}
          user={bookData.user}
          title={bookData.title}
          authors={bookData.authors}
          isbn={bookData.isbn}
          bookCover={bookData.img_url}
          description={bookData.description}
          publishedDate={bookData.published_date}
          pageCount={bookData.page_count}
          bookCategory={bookData.book_category}
          googleBooksId={bookData.book_id_google_books}
          bookSearchString={bookSearch}
        />
      );
    });
  }

  return (
    <div className="grid-container index">
      <br></br>
      <h5>Search for new books!</h5>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search from over 25 million books"
            value={bookSearch.searchString}
            id="searchString"
          />
        </div>
        <button className="button" type="submit">
          Search
        </button>
        <br></br>
        <Link
          to={`/users/${user.user_id}`}
          className="booksindexcontainer button"
        >
          Go to Your Library
        </Link>
        <br></br>

          <Link
            to={`/nytbookslists`}
            className="booksindexcontainer button"
          >
            Get the New York Times Book List
          </Link>

      </form>

      <div className="grid-x">
        <br></br>
        <br></br>
        <br></br>
        <h3>{indexHeader}</h3>
        <div className="wrapper">{bookInfo}</div>
      </div>
    </div>
  );
};

export default BooksIndexContainer;
