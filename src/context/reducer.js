export default (state, action) => {
  const { type, payload } = action

  switch(type){
    case "SET_SEARCH":
      return { ...state, searchTerm: payload }
    default:
      return state
  }
}