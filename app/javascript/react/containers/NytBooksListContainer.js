import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NytBookTile from "../components/NytBookTile";

const NytBooksListContainer = props => {

  const [bookLists, setBookLists] = useState([]);

  const fetchBookLists = () => {
    fetch("/api/v1/nytbookslists")
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
        }
      }
    )
    .then(response => response.json())
    .then((body) => {
      setBookLists(body);
    });
  };

  useEffect(() => {
    fetchBookLists();
  }, []);



  let booklistInfo
  if (bookLists !=null){
   booklistInfo = bookLists.map((listData,i) => {
    return (
      <option
        key={i}
        listname={listData.list_name}
        displayname={listData.display_name}
        oldestpublisheddate={listData.oldest_published_date}
        newestpublisheddate={listData.newest_published_date}
        updated={listData.updated}
        value={listData.display_name}
      >{listData.list_name}</option>
    )
  });
}

  return (
    <div className="grid-container index">
      <br></br>
      <h5>New York Times Best Seller Lists!</h5>
        <select>{booklistInfo}</select>
    </div>
  );
};

export default NytBooksListContainer;
