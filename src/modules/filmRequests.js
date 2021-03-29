import axios from "axios"

const API_KEY = "189ee196d9b91bf258df53b25ad03dc8"

export const filmServer = axios.create({
  baseURL: "https://api.themoviedb.org/3"
})

export default {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOg: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  searchQuery: (query, page) => `/search/movie?api_key=${API_KEY}&language=en-US&page=${page ?? "1"}&include_adult=false&query=${query.toLowerCase()}`
}