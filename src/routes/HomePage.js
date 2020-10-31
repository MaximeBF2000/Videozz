import React from "react"
import FilmBanner from "../components/FilmBanner"
import Navbar from "../components/Navbar"
import FilmsRow from "../components/FilmsRow"
import requests from "../modules/filmRequests"

export default function HomePage() {
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
