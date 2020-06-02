import React from "react";
import { Link } from "react-router-dom";

const NytBookTile = props => {


  // let renderUserLibraryonIndex=""
  // if (!props.bookSearchString.searchString){
  //   renderUserLibraryonIndex= `/books/${props.googleBooksId}`
  // }else{
  //   renderUserLibraryonIndex= `/books/${props.id}`
  // }
  return (
    <div className="callout book-tile">
        <img className=" book-tile-image" src={props.bookCover} height="300" width="300"></img>
        <br></br>
        <br></br>
        <p className="booktile" > <b>Title: </b>{props.title}</p>
        <p className="booktile"> <b>Authors: </b>{props.author}</p>
        <p className="booktile"> <b>List Rank: </b> {props.rank}</p>
        <p className="booktile"> <b>Previous Week Rank: </b> {props.previousRank}</p>
        <p className="booktile"> <b>Weeks on List: </b> {props.weeksOnList}</p>
        <br></br>
        <br></br>
    </div>
  );
};

export default NytBookTile;
