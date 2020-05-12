import React from "react";
import { Link } from "react-router-dom";

const UserTile = props => {
  return (
    <div className="cell small-3 callout">
      <img src={props.bookCover} height="200" width="200"></img>
    </div>
  );
};

export default UserTile;
