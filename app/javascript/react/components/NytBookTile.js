import React from "react";
import { Link } from "react-router-dom";

const NytBookTile = props => {

  return (
    <div className="callout grid-x grid-padding-x">
      <div className="cell small-4">
        <img className=" book-tile-image" src={props.bookCover} height="170" width="200"></img>
        </div>

        <div className="cell small-4 align middle">
        <p className="booktile" > <b>Title: </b>{props.title}</p>
        <p className="booktile"> <b>Authors: </b>{props.author}</p>
        <p className="booktile"> <b>List Rank: </b> {props.rank}</p>
        <p className="booktile"> <b>Previous Week Rank: </b> {props.previousRank}</p>
        <p className="booktile"> <b>Weeks on List: </b> {props.weeksOnList}</p>

        </div>
    </div>
  );
};

export default NytBookTile;
