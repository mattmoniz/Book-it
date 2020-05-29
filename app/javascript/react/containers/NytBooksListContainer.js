import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NytBookTile from "../components/NytBookTile";

const NytBooksListContainer = props => {
  const [bookLists, setBookLists] = useState([]);
  const [bookListSelect, setBookListSelect] = useState({
    selectedString: ""
  });

  const fetchBookLists = () => {
    fetch("/api/v1/nytbookslists")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setBookLists(body);
      });
  };

  useEffect(() => {
    fetchBookLists();
  }, []);

  const handleChange = event => {
        debugger
    setBookSearch({
      selectedString: event.currentTarget.value
    });
  };

  const handleSubmit = event => {
    debugger
    event.preventDefault();
    fetch("/api/v1/nytbookslists/selectlist", {
      method: "POST",
      body: JSON.stringify(bookListSelect),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        setBookListSelect(body);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  let booklistInfo;
  if (bookLists != null) {
    booklistInfo = bookLists.map((listData, i) => {
      return (
        <option
          key={i}
          listname={listData.list_name}
          displayname={listData.display_name}
          oldestpublisheddate={listData.oldest_published_date}
          newestpublisheddate={listData.newest_published_date}
          updated={listData.updated}
          value={bookListSelect.display_name}
          id="selectedString"
        >
          {listData.list_name}
        </option>
      );
    });
  }

  return (
    <div className="grid-container index">
      <br></br>
      <h5>New York Times Best Seller Lists!</h5>
      <form className="nytimes-listform" onSubmit={handleSubmit}>
        <select>{booklistInfo}</select>
        <button className="button" type="submit">
          Get the NY Times BookList
        </button>
        <br></br>
      </form>
    </div>
  );
};

export default NytBooksListContainer;
