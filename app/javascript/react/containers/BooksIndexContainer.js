import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      });
  };

  let bookInfo
  if (books !=null){
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
      />
    );
  });
}


  return (
    <div className="grid-container index">
      <br></br>
      <h5>Add Books to your Library</h5>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoComplete="off"
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
        <br></br>
        <Link to={`/users/${user.user_id}`} className="booksindexcontainer button">
            Go to Your Library
          </Link>

      </form>

      <div className="grid-x">
        <br></br>
        <div className="wrapper">{bookInfo}</div>
      </div>
    </div>
  );
};

export default BooksIndexContainer;
