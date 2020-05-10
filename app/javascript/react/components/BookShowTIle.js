import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const BookShowTile = (props) => {

  const [bookRecord, setAddbookRecord] = useState({});

  return (
    <div className="book-tile callout">
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>
          <p> Description: {props.description}</p>
          <input className="button center" type="submit" value="Add to Bookshelf"/>
  </div>
  );
};

export default BookShowTile;
