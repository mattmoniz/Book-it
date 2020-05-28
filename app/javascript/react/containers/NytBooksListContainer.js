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

  const handleChange = event => {
    let selectedValue = event.target.value;
    this.props.onSelectChange(selectedValue);
  };


  let booklistInfo
  if (bookLists !=null){
   booklistInfo = bookLists.map(listData => {
    return (
      <NytBookTile
        key={listData.id}
        id={listData.id}
        listName={listData.list_name}
        displayName={listData.display_name}
        oldestPublishedDate={listData.oldest_published_date}
        newestPublishedDate={listData.newest_published_date}
        updated={listData.updated}
      />
    );
  });
}

  return (
    <div className="grid-container index">
      <br></br>
      <h5>New York Times Best Seller List!</h5>
        <select id="list" value={bookLists.displayName} onChange={handleChange}>
        </select>
    </div>
  );
};

export default NytBooksListContainer;
