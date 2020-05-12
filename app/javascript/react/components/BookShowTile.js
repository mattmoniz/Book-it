import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = (props) => {

  const [bookRecord, setBookRecord] = useState({});

  return (
    <div className="book-tile" >
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>
          <p> Description: {props.description}</p>
          <div className="button-group align-center">
            <input className="button" type="submit" value="Add to Library" onClick={props.fetchBookInfo} />
            <Link to="/books" className="button center">Return to Search</Link>
          </div>
    </div>

  );
};

export default BookShowTile;
