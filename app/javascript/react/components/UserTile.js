import React from "react";
import { Link } from "react-router-dom";

const UserTile = props => {
  let deleteButton = <input id={`${props.id}`} type="button" value="Delete" onClick={props.deleteClick} className="delete button"></input>
return (

    <div className="callout user-tile">
      <Link to={`/books/${props.bookIdGoogleBooks}`}>
        <img src={props.bookCover} height="300" width="300"></img>
        <br></br>
        <br></br>
        <p className="usertile" > <b>Title: </b>{props.title}</p>
        <p className="usertile">  <b>Authors: </b> {props.authors}</p>
        <p className="usertile">  <b>Published Date: </b> {props.publishedDate}</p>
        <Link to="/books" className="linkUserShowTile"> Return to Search </Link>
        {deleteButton}
        </Link>
      </div>
  );
};


export default UserTile;
