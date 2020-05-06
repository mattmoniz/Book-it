import React, { useState, useEffect } from 'react'
import BookTile from "../components/BookTile";

const BooksIndexContainer = (props) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch("/api/v1/books")
      .then(response => response.json())
      .then(booksBody => {
        setBooks(booksBody)
      })
  }, [])

  const bookImages = books.map((bookLink) => {
    return(
      <BookTile
        key={bookLink.id}
        book={bookLink}
        />
    )
  })
  return (
    <div className="center">
      <form>
        <div class="form-group">
          <input type="text" className="form-control mt-10" placeholder="Search for New Books"/>
        </div>
        <button type="submit" className="btn btn-danger">Search</button>
      </form>

      <h1>THE Best Books</h1>
        {bookImages}

    </div>
  )
}

export default BooksIndexContainer
