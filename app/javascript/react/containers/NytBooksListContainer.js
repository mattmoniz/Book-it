import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NytBookTile from "../components/NytBookTile";

const NytBooksListContainer = props => {
  const [bookLists, setBookLists] = useState([]);
  const [bookListSelect, setBookListSelect] = useState({
    selectedString: ""
  });
  const [bestSellerList, setbestSellerList] = useState([]);

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
    setBookListSelect({
      selectedString: event.currentTarget.selectedOptions[0].getAttribute("listnameencoded"),
    });
  };

  const handleSubmit = event => {
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
        setbestSellerList(body);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  let bookgenreInfo;
  if (bookLists != null) {
    bookgenreInfo = bookLists.map((listData, i) => {
      return (
        <option
          key={i}
          listname={listData.list_name}
          displayname={listData.display_name}
          oldestpublisheddate={listData.oldest_published_date}
          newestpublisheddate={listData.newest_published_date}
          updated={listData.updated}
          listnameencoded={listData.list_name_encoded}
          value={bookListSelect.list_name_encoded}
          id="selectedString"
        >
          {listData.list_name}
        </option>
      );
    });
  }

  let bestSellers;
  if (bestSellerList != null) {
    bestSellers = bestSellerList.map((listData, i) => {

      return (
        <NytBookTile
          key={i}
          title={listData.title}
          author={listData.author}
          bookCover={listData.book_image}
          isbn={listData.isbn}
          rank={listData.rank}
          previousRank={listData.rank_last_week}
          weeksOnList={listData.weeks_on_list}
          description={listData.description}
        />
      );
    });
  }

  return (
    <div className="grid-container index">
      <br></br>
      <h5>New York Times Best Seller Lists!</h5>
      <form className="nytimes-listform" onSubmit={handleSubmit}>
        <select onChange={handleChange}>{bookgenreInfo}</select>
        <button className="button" type="submit">
          Get the NY Times BookList
        </button>
        <br></br>
      </form>

      <div>{bestSellers}</div>
    </div>
  );
};

export default NytBooksListContainer;
