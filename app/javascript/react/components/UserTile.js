import React from "react";
import { Link } from "react-router-dom";

const UserTile = props => {
  // debugger
  return (
    <div className="callout userTile">
        <img src={props.bookCover} height="200" width="200"></img>
          <p className="usertile" > <b>Title: </b>{props.title}</p>
          <p className="usertile">  <b>Authors: </b> {props.authors}</p>
          <p className="usertile">  <b>Published Date: </b> {props.publishedDate}</p>
          <Link to="/books" className="linkUserShowTile"> Return to Search </Link>
  </div>
  );
};


export default UserTile;

// <Link to={`/books/${props.id}`}>
//   <img src={props.bookCover} height="200" width="200"></img>
//     <p className="usertile" > Title: {props.title}</p>
//     <p className="usertile">  Authors: {props.authors}</p>
//     <p className="usertile">  Published Date: {props.publishedDate}</p>
// </Link>
