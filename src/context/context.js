import React, { createContext, useContext, useReducer } from "react"
import stateReducer from "./reducer"
import initialState from "./initState"

export const GeneralContext = createContext(initialState)

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return (
    <GeneralContext.Provider value={{ ...state, dispatch }}>
      { children }
    </GeneralContext.Provider>
  )
}

export const useStore = () => useContext(GeneralContext)