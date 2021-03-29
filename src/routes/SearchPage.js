import React, { useState, useEffect } from "react"
import { useStore } from "../context/context"
import { useHistory } from "react-router-dom"
import requests, { filmServer } from "../modules/filmRequests"

import Navbar from "../components/Navbar"
import FilmItem from "../components/FilmItem"
import SingleFilmDetails from "../components/SingleFilmDetails"

export default function SearchPage() {
  const [movies, setMovies] = useState([])
  const [showMovie, setShowMovie] = useState(false)
  const { searchTerm } = useStore()
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const res = await filmServer.get(requests.searchQuery(searchTerm))
      setMovies(res.data.results)
      console.log(res)
    }
    fetchData()
  }, [searchTerm])

  const goToHome = () => history.push("/")

	return (
		<div className="searchPage">
      <Navbar />
			<button className="goBackBtn" onClick={goToHome}>Go back</button>
      <h2 className="searchTitle">Films for : "{searchTerm}"</h2>
			<div className="searchFilmContainer">
        {movies.length === 0 ? (
          <p>No results found...</p>
        ) : (
          movies.map((movie, i) => (
            <>
              <FilmItem movie={movie} key={i} onClick={() => setShowMovie(ps => !ps)} />
            </>
          ))
        )}
      </div>
		</div>
	)
}
