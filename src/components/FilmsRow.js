import React, { useState, useEffect } from "react"
import movieTrailer from "movie-trailer"
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs"

import FilmItem from "./FilmItem"
import SingleFilmDetails from "./SingleFilmDetails"
import { filmServer } from "../modules/filmRequests"

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"

export default function FilmsRow({ title, request, bigger }) {
	const [movies, setMovies] = useState([])

	// FILM DETAILS STATE
	const [showDetails, setShowDetails] = useState(false)
	const [videoUrl, setVideoUrl] = useState("")
	const [movieDetails, setMovieDetails] = useState({})
	const [hasVideo, setHasVideo] = useState(true)
	const [hasAlreadyClicked, setHasAlreadyClicked] = useState(false)

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

	const HandleItemClick = movie => {
		setMovieDetails(movie)

		// SEARCH A TRAILER BY FILM NAME (EXTERNAL MODULE)
		movieTrailer(
			movie?.name || movie?.original_title || movie?.original_name || ""
		)
			.then(url => {
				// RETURN A VIDEO :
				setHasVideo(true)
				const urlParams = new URLSearchParams(new URL(url).search)

				// THE VIDEO FOUND IS ALREADY RUNNING ? THEN CLOSE
				if (urlParams.get("v") === videoUrl && videoUrl !== "") {
					setMovieDetails({})
					setVideoUrl("")
					setShowDetails(false)
					return
				}
				setVideoUrl(urlParams.get("v"))
			})
			.catch(err => {
				// NO VIDEO FOUND OR OTHER ERROR
				setHasAlreadyClicked(!hasAlreadyClicked)
				setHasVideo(false)

				// WE ALREADY CLICKED TO OPEN THIS TAB ? THEN CLOSE
				if (hasAlreadyClicked) {
					setShowDetails(false)
					setHasAlreadyClicked(false)
				}
				console.log(err)
			})
		setShowDetails(true)
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
					if (movie.poster_path) {
						const movieName = movie.name || movie.original_title
						return (
							<FilmItem key={i} movie={movie} handleClick={() => HandleItemClick(movie)} />
						)
					}
				})}
			</div>
			{showDetails && (
				<SingleFilmDetails
					videoId={videoUrl}
					movie={movieDetails}
					hasVideo={hasVideo}
				/>
			)}
		</div>
	)
}
