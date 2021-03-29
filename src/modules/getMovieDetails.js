import movieTrailer from "movie-trailer"

const getMovieDetails = movie => {
  let videoUrl = ""
  let hasVideo = false

  // SEARCH A TRAILER BY FILM NAME (EXTERNAL MODULE)
  movieTrailer(
    movie?.name || movie?.original_title || movie?.original_name || ""
  )
    .then(url => {
      // RETURN A VIDEO :
      hasVideo = true
      const urlParams = new URLSearchParams(new URL(url).search)
      videoUrl = urlParams.get("v")
    })
    .catch(err => {
      hasVideo = false
      videoUrl = ""
      console.log({errorWithMovieTrailer: err})
    })


  return [videoUrl, hasVideo]
}


export default getMovieDetails