import genres from "./filmGenres.json"

export default function(arr_of_ids){
  const arr_of_genres = []
  arr_of_ids.forEach(el => {
    genres.forEach(KeyValuePair => {
      if(KeyValuePair.id == el){
        arr_of_genres.push(KeyValuePair.name)
      }
    })
  })
  return arr_of_genres
}