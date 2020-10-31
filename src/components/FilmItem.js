import React from "react"

export default function FilmItem({ movie, handleClick }) {
	const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"
	const movieName = movie.name || movie.original_title

	return (
		<div className="filmItem" onClick={handleClick}>
			<div className="filmImg">
				<img
					src={movie.poster_path ? (IMG_BASE_URL + movie.poster_path) : "https://cloud.filmfed.com/defaults/movie-poster/m_movie_poster_default.png"}
					alt={"Movie : " + (movieName || "unknown")}
				/>
			</div>
		</div>
	)
}
