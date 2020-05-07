import React, { useState, useEffect } from 'react'
import BookTile from "../components/BookTile";

const BooksIndexContainer = (props) => {
  const [books, setBooks] = useState([])
const fetchBookData = () => {
  fetch("/api/v1/books")
    .then(response => response.json())
    .then(booksBody => {
      // debugger
      setBooks(booksBody)
        // debugger
    }
  )
}

  useEffect(() => {
    fetchBookData();
  }, [])

  const bookInfo = books.map((bookData) => {

    return(
      <BookTile
        key={bookData.isbn}
        title={bookData.title}
        authors={bookData.authors}
        description={bookData.description}
        isbn={bookData.isbn}
        bookCover={bookData.img_url}
        />
    )
  })
  return (
    <div className="center">
      <form>
        <div className="form-group">
          <input type="text" className="form-control mt-10" placeholder="Search for New Books"/>
        </div>
        <button type="submit" className="btn btn-danger">Search</button>
      </form>

      <h1>THE Best Books</h1>
        {bookInfo}

    </div>
  )
}

export default BooksIndexContainer
