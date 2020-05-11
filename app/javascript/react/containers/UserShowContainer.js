import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import UserTile from "../components/UserTile";

const UserShowContainer = props => {

const [bookLibrary, setBookLibrary] = useState({});
const [book, setBook] = useState({});
const [user, setUser] = useState({
  user_id: "",
  user_email: ""
});
debugger

const fetchBookData = () => {
  fetch(`/api/v1/user/${id}`)
    .then((response) => {
      if (response.ok) {
        return response;
      }})
    .then((response) => response.json())
    .then((body) => {
      debugger
      setBook(body);
      setUser({user_id: body.user_id,
              user_email: body.user_email});
    })
  };

  useEffect(() => {
    fetchBookData();
  }, []);

    UserTiles = books.map((book) => {
      return <UserTile key={user.user_id} book={book} />
    });


    const rerender = (bookLibrary) => {
      setBookLibrary(
        [...bookLibrary, bookLibrary]
      )
    }

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //     let payload = {
  //         title: book.title,
  //         authors: book.authors,
  //         description: book.description,
  //         isbn: book.isbn,
  //         img_url:book.img_url,
  //         book_id: book.id,
  //         user_id: user.user_id
  //     };
  //     fetch('/api/v1/user/${id}', {
  //       credentials: "same-origin",
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response;
  //         }
  //       })
  //       .then((response) => response.json())
  //       .then((body) => {
  //         setReviewRecord({
  //           rating: "",
  //           review: ""
  //          })
  //       })
  //       .catch((error) => console.error(`Error in fetch: ${error.message}`));
  // };


  return (
    <div className="grid-container">
      <div className="grid-x">
        {userTiles}
      </div>
    </div>
  );
};

export default UserShowContainer;
