import React, { useState, useEffect } from "react"
import { useStore } from "../context/context"
import { useHistory } from "react-router-dom"
import axios from "axios"
import requests, { filmServer } from "../modules/filmRequests"

import Navbar from "../components/Navbar"
import FilmItem from "../components/FilmItem"

export default function SearchPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const { searchTerm } = useStore()
  const history = useHistory()

  useEffect(() => {
    const source = axios.CancelToken.source()
    async function fetchData() {
      setLoading(true)
      try {
        const resMovies = await filmServer.get(requests.searchMovies(searchTerm), { cancelToken: source.token })
        const resSeries = await filmServer.get(requests.searchSeries(searchTerm), { cancelToken: source.token })
        setMovies([...resSeries.data.results, ...resMovies.data.results])
        setLoading(false)
      } catch(err) {
        console.error("Error while fetching movies : ", err)
      }
      setLoading(false)
    }
    fetchData()

    return () => source.cancel()
  }, [searchTerm])

  const goToHome = () => history.push("/")

	return (
		<div className="searchPage">
      <Navbar />
			<button className="goBackBtn" onClick={goToHome}>Go back</button>
      <h2 className="searchTitle">Films for : "{searchTerm}"</h2>
			<div className="searchFilmContainer">
        {loading ? (
          <p>Loading...</p>
        ) :movies.length === 0 ? (
          <p>No results found...</p>
        ) : (
          movies.map((movie, i) => (
            <FilmItem key={i} movie={movie} />
          ))
        )}
      </div>
		</div>
	)
}
