import React from "react";
import { Link } from "react-router-dom";

const BookTile = (props) => {


  const onSubmit = (event) => {
  event.preventDefault();
  if (validForSubmission()) {
    let formPayload = {
      review: {
        review: reviewRecord.review,
        rating: reviewRecord.rating,
        user_id: props.user.id,
        podcast_id: props.id
      }
    };
    fetch(`/api/v1/podcasts/${props.id}/reviews`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          response.json().then((body) => setErrors(body.error));
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        props.rerender(body.review)
        setReviewRecord({
          rating: "",
          review: ""
         })
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }
};




  return (
    <div className="book-tile callout">
        <img src={props.bookCover}  height="200" width="200"></img>
          <p> Title: {props.title}</p>
          <p> Authors: {props.authors}</p>

      <button className="button" type="submit" >
        Add to library
      </button>
  </div>
  );
};

export default BookTile;


// import React from "react";
// import { Link } from "react-router-dom";
//
// const BookTile = (props) => {
//
//   return (
//     <div className="book-tile callout">
//       <Link to="/api/v1/books/${id}">
//         <img src={props.bookCover}  height="200" width="200"></img>
//           <p> Title: {props.title}</p>
//           <p> Authors: {props.authors}</p>
//       </Link>
//   </div>
//   );
// };
//
// export default BookTile;
