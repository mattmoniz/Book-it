import React from "react";
import { Link } from "react-router-dom";

const NytBookTile = props => {
  debugger

  // let renderUserLibraryonIndex=""
  // if (!props.bookSearchString.searchString){
  //   renderUserLibraryonIndex= `/books/${props.googleBooksId}`
  // }else{
  //   renderUserLibraryonIndex= `/books/${props.id}`
  // }
  return (
    <div className="callout book-tile">
      <Link to={renderUserLibraryonIndex}>
        <img className=" book-tile-image" src={props.bookCover} height="300" width="300"></img>
        <br></br>
        <br></br>
        <p className="booktile" > <b>Title: </b>{props.title}</p>
        <p className="booktile"> <b>Authors: </b>{props.authors}</p>
        <p className="booktile"> <b>Published Date: </b> {props.publishedDate}</p>
        <br></br>
        <br></br>
      </Link>
    </div>
  );
};

export default NytBookTile;
