import React from "react";
import { Link } from "react-router-dom";

const UserTile = props => {
  debugger
  let deleteButton = <input id={`${props.id}`} type="button" value="Delete" onClick={props.deleteClick} className="delete button"></input>
return (
  <Link to={`/books/${props.bookIdGoogleBooks}`}>
    <div className="callout userTile">
        <img src={props.bookCover} height="200" width="200"></img>
        <p className="usertile" > <b>Title: </b>{props.title}</p>
        <p className="usertile">  <b>Authors: </b> {props.authors}</p>
        <p className="usertile">  <b>Published Date: </b> {props.publishedDate}</p>
        <Link to="/books" className="linkUserShowTile"> Return to Search </Link>
        {deleteButton}
      </div>
  </Link>
  );
};


export default UserTile;
