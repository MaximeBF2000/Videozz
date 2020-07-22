import React from 'react'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"


export default function FilmItem({ movie }) {
  const movieName = movie.name || movie.original_title


  return (
    <div className="filmItem">
      <div className="filmImg">
        <img src={IMG_BASE_URL + movie.poster_path} alt={"Movie : " + movieName}/>
      </div>
      {/* <div className="filmTitleContainer">
        <div className="filmTitle">
          {movieName.toUpperCase()}
        </div>
      </div> */}
    </div>
  )
}
