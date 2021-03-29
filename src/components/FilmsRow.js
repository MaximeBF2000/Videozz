import React, { useState, useEffect } from "react"
import movieTrailer from "movie-trailer"
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs"

import FilmItem from "./FilmItem"
import { filmServer } from "../modules/filmRequests"

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"

export default function FilmsRow({ title, request, bigger }) {
	const [movies, setMovies] = useState([])

	// FILM DETAILS STATE
	const [showDetails, setShowDetails] = useState(false)
	const [videoUrl, setVideoUrl] = useState("")
	const [hasTrailer, setHasTrailer] = useState(true)
	const [movieDetails, setMovieDetails] = useState({})

	// GET FILMS
	useEffect(() => {
		async function fetchData() {
			const response = await filmServer.get(request)
			setMovies(response.data.results)
		}
		fetchData()
	}, [request])

	// CHEVRON CLICK HANDLING --> MOVE LEFT OR RIGHT WITH THE CHEVRONS
	const scrollHandle = (e, direction) => {
		const row = e.target.parentNode.parentNode.querySelector(".filmRow")
		const elem_width = e.target.parentNode.parentNode.querySelector(".filmItem")
			.clientWidth
		const scrollIntensity = bigger
			? (elem_width + 20) * 5
			: (elem_width + 20) * 7

		console.log(scrollIntensity)

		if (direction === "left") {
			// if(row.scrollLeft === 0) return
			row.scrollBy({ top: 0, left: -scrollIntensity, behavior: "smooth" })
		} else {
			row.scrollBy({ top: 0, left: +scrollIntensity, behavior: "smooth" })
		}
	}

	return (
		<div className="filmCategory">
			<div
				className="chevron chevronLeft"
				onClick={e => scrollHandle(e, "left")}
			>
				<BsChevronCompactLeft />
			</div>
			<div
				className="chevron chevronRight"
				onClick={e => scrollHandle(e, "right")}
			>
				<BsChevronCompactRight />
			</div>
			<h2 className="categoryTitle">{title}</h2>
			<div className={`filmRow ${bigger && "bigger"}`}>
				{movies.map((movie, i) => {
					if (movie.poster_path) return <FilmItem key={i} movie={movie} />
        })}
			</div>
		</div>
	)
}
