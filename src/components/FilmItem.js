import React, { useState } from "react"
import SingleFilmDetails from "./SingleFilmDetails"
import useGetMovieDetails from "../modules/getMovieDetails"


export default function FilmItem({ movie }) {
	const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"
	const movieName = movie.name || movie.original_title

  const [url, hasTrailer] = useGetMovieDetails(movie)
  const [showDetails, setShowDetails] = useState(false)

	return (
		<>
      <div className="filmItem" onClick={() => setShowDetails(ps => !ps)}>
        <div className="filmImg">
          <img
            src={movie.poster_path ? (IMG_BASE_URL + movie.poster_path) : "https://cloud.filmfed.com/defaults/movie-poster/m_movie_poster_default.png"}
            alt={"Movie : " + (movieName || "unknown")}
          />
        </div>
      </div>
      <SingleFilmDetails
        open={showDetails}
        onClose={() => setShowDetails(false)}
        videoId={url}
        movie={movie}
        hasTrailer={hasTrailer}
      />
    </>
	)
}
