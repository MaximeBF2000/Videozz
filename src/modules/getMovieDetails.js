import { useState } from "react"
import movieTrailer from "movie-trailer"

const useGetMovieDetails = movie => {
  const [videoUrl, setVideoUrl] = useState("")
  const [hasVideo, setHasVideo] = useState(false)

  // Search by film name on Youtube
  movieTrailer(movie?.name || movie?.original_title || movie?.original_name || "")
    .then(url => {
      // RETURN A VIDEO :
      setHasVideo(true)
      const urlParams = new URLSearchParams(new URL(url).search)
      setVideoUrl(urlParams.get("v"))
    })
    .catch(() => {
      setHasVideo(false)
      setVideoUrl("")
    })


  return [videoUrl, hasVideo]
}


export default useGetMovieDetails