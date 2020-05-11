import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookShowTile = (props) => {

  const [bookRecord, setBookRecord] = useState({});



//   const handleChange = (event) => {
//   setBookRecord({
//     ...bookRecord,
//     [event.currentTarget.id]: event.currentTarget.value,
//   });
// };




  return (
    <div className="book-tile">
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>
          <p> Description: {props.description}</p>
          <input className="button" type="submit" value="Add to Library" />
  </div>
  );
};

export default BookShowTile;
