import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NytBookTile from "../components/NytBookTile";

const NytBooksListContainer = props => {
  const [books, setBooks] = useState([]);

  const fetchUserData = () => {
    fetch("/api/v1/nytimeslist")
      .then(response => response.json())
      .then(userInfo => {
        setBooks(userInfo.user_books);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const handleChange = event => {
  // };
  //
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   fetch("/api/v1/nytimeslist", {
  //     method: "GET",
  //     body: JSON.stringify(bookSearch),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(body => {
  //       setBooks(body);
  //     });
  // };

  let bookInfo
  if (books !=null){
   bookInfo = books.map(bookData => {
    return (
      <NytBookTile
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
      />
    );
  });
}


  return (
    <div className="grid-container index">
      <br></br>
      <h5>New York Times Best Seller List!</h5>

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
        <Link to={`/users/${user.user_id}`} className="booksindexcontainer button">
            Go to Your Library
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

export default NytBooksListContainer;
