import React from 'react'
import Youtube from "react-youtube"

import ids_to_genres from "../modules/filmGenreConverter"

export default function SingleFilmDetails({ videoId, movie, hasVideo }) {
  const video_options = {
    height: 320,
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }
  const genre_ids = movie?.genre_ids || []
  const genres = ids_to_genres(genre_ids)

  const handleError = () => {
    console.log("error")
  }

  return (
    <div className="singleFilmDetails">
      <div className="trailer">
        {hasVideo ?
        <Youtube
          videoId={videoId}
          opts={video_options}
          onError={handleError}
        /> 
        : <div className="noVideoFound">No trailer found</div> }
      </div>
      <div className="details">
        <h3>{movie?.name || movie?.original_title}</h3>
        <p className="description">
          {movie?.overview}
        </p>
        <div className="genres">
          {genres.map((genre, i) => <div className="genre_tag" key={i}>{genre}</div>)}
        </div>
      </div>
    </div>
  )
}
