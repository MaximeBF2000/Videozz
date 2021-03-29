import React, { useState, useEffect } from 'react'
import requests, { filmServer } from "../modules/filmRequests"
import SingleFilmDetails from "../components/SingleFilmDetails"


const truncateStr = (str, n) => str?.length > n ? str.slice(0, n - 1) + "..." : str

export default function FilmBanner() {
  const [movie, setMovie] = useState([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    async function fetchData(){
      const response = await filmServer.get(requests.fetchTrending)
      const movies = response.data.results
      const random = Math.floor(Math.random() * (movies.length - 1))
      setMovie(movies[random])
    }
    fetchData()
  }, [])

  return (
    <>
      <header className="banner" style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}>
        <div className="banner_content">
          <h1 className="banner_title"> { movie?.title || movie?.name || movie?.original_name } </h1>
          <div className="banner_buttons">
            <button className="banner_btn">Play</button>
            <button className="banner_btn">Info</button>
          </div>
          <div className="banner_description">
            {truncateStr(movie?.overview, 150)}
          </div>
        </div>
      </header>
      <SingleFilmDetails
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
}
