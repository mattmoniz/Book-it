import React, { useState, useEffect } from "react";
import BookTile from "../components/BookTile";

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
      });
  };

  const bookInfo = books.map(bookData => {
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
      />
    );
  });

  return (
    <div className="grid-container">
      <h5>Add Books to your Library</h5>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input autocomplete="off"
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search for New Books"
            value={bookSearch.searchString}
            id="searchString"
          />
        </div>
        <button className="button" type="submit">
          Search
        </button>
      </form>

      <div className="grid-x">
        <div className="small-3 rows">{bookInfo}</div>
      </div>
    </div>
  );
};

export default BooksIndexContainer;
