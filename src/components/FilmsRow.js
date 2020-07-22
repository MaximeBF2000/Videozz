import React, { useState, useEffect } from 'react'
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs"

import FilmItem from "./FilmItem"
import { filmServer } from "../modules/filmRequests"


export default function FilmsRow({ title, request, bigger }) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await filmServer.get(request)
      setMovies(response.data.results)
    }
    fetchData()
  }, [request])

  const scrollHandle = {
    SCROLL_INTENSITY: bigger ? 235*5 : 170*7,
    left: e => {
      const row = e.target.parentNode.parentNode.lastChild
      if(row.scrollLeft === 0) return
      row.scrollLeft -= scrollHandle.SCROLL_INTENSITY
    },
    right: e => {
      const row = e.target.parentNode.parentNode.lastChild
      row.scrollLeft += scrollHandle.SCROLL_INTENSITY
    }
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
            return <FilmItem key={movie.id} movie={movie} />
          }
        })}
      </div>
    </div>
  )
}
