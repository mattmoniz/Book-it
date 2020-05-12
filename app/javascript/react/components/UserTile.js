import React from "react";
import { Link } from "react-router-dom";

const UserTile = props => {
  return (
    <div className="callout">
      <Link to={`/books/${props.id}`}>
        <img src={props.bookCover} height="200" width="200"></img>
      </Link>
    </div>
  );
};

export default UserTile;
