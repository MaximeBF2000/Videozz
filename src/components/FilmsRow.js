import React, { useState, useEffect } from 'react'
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs"

import SingleFilmDetails from "./SingleFilmDetails"
import { filmServer } from "../modules/filmRequests"
import movieTrailer from "movie-trailer"

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
  const scrollHandle = {
    SCROLL_INTENSITY: bigger ? 235*5 : 170*7,
    left: e => {
      const row = e.target.parentNode.parentNode.querySelector(".filmRow")
      if(row.scrollLeft === 0) return
      row.scrollLeft -= scrollHandle.SCROLL_INTENSITY
    },
    right: e => {
      const row = e.target.parentNode.parentNode.querySelector(".filmRow")
      row.scrollLeft += scrollHandle.SCROLL_INTENSITY
    }
  }

  const HandleItemClick = movie => {
    setMovieDetails(movie)

    // SEARCH A TRAILER BY FILM NAME (EXTERNAL MODULE)
    movieTrailer(movie?.name || movie?.original_title || movie?.original_name || "")
      .then(url => {
        // RETURN A VIDEO :
        setHasVideo(true)
        const urlParams = new URLSearchParams(new URL(url).search)

        // THE VIDEO FOUND IS ALREADY RUNNING ? THEN CLOSE
        if(urlParams.get("v") === videoUrl && videoUrl !== ""){
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
        if(hasAlreadyClicked) {
          setShowDetails(false)
          setHasAlreadyClicked(false)
        }
        console.log(err)
      })
    setShowDetails(true)
  }

  return (
    <div className="filmCategory">
      <div className="chevron chevronLeft" onClick={e => scrollHandle.left(e)}>
        <BsChevronCompactLeft />
      </div>
      <div className="chevron chevronRight" onClick={e => scrollHandle.right(e)}>
        <BsChevronCompactRight />
      </div>
      <h2 className="categoryTitle">{ title }</h2>
      <div className={`filmRow ${bigger && "bigger"}`}>
        {movies.map(movie => {
          if(movie.poster_path){
            const movieName = movie.name || movie.original_title
            return (
              <div className="filmItem" key={movie.id} onClick={() => HandleItemClick(movie)}>
                <div className="filmImg">
                  <img src={IMG_BASE_URL + movie.poster_path} alt={"Movie : " + (movieName || "unknown")}/>
                </div>
              </div>
            )
          }
        })}
      </div>
      {showDetails && <SingleFilmDetails videoId={videoUrl} movie={movieDetails} hasVideo={hasVideo} />}
    </div>
  )
}
