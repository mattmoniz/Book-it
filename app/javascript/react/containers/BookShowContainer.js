import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const BookShowContainer = (props) => {
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    fetch(`/api/v1/podcasts/${id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        }})
      .then((response) => response.json())
      .then((body) => {
        setPodcast(body.podcast);
        setUser(body.podcast.user)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);



  let reviewForm;
  if (user.userName != null) {
    reviewForm = <PodcastReviewFormContainer
      id={props.match.params.id}
      rerender={rerender}
      user={user} />
  } else {
    reviewForm = <></>
  }

  return (
    <div>
      <div className="grid-container no-padding">
        <div className="grid-x grid-margin-x callout">
          <h3 className="cell small-8 large-10">{podcast.name}</h3>
          <a className="button cell small-4 large-2 listen" href={podcast.url} target="_blank">
            Listen Here
          </a>
        </div>
      </div>
      {reviewForm}
      <div className="callout">
        <h4>Reviews:</h4>
        {reviewTiles}
      </div>
      <Link to="/" className="button">All Podcasts</Link>
    </div>
  );
};

export default BookShowContainer;
