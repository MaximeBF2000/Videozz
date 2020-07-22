import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import "./app.scss"

import FilmBanner from "./components/FilmBanner"
import Navbar from "./components/Navbar"

import requests from "./modules/filmRequests"
import FilmsRow from "./components/FilmsRow"


function App() {
  return (
    <>
      <Navbar />
      <FilmBanner />
      <div className="body">
        <FilmsRow title="Netflix Originals" request={requests.fetchNetflixOg} bigger />
        <FilmsRow title="Trending" request={requests.fetchTrending} />
        <FilmsRow title="Top Rated" request={requests.fetchTopRated} />
        <FilmsRow title="Action" request={requests.fetchActionMovies} />
        <FilmsRow title="Comedy" request={requests.fetchComedyMovies} />
        <FilmsRow title="Horror" request={requests.fetchHorrorMovies} />
        <FilmsRow title="Romance" request={requests.fetchRomanceMovies} />
        <FilmsRow title="Documentaries" request={requests.fetchDocumentaries} />
      </div>
    </>
  )
}


ReactDOM.render(<App />, document.getElementById("root"))