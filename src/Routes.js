import React from "react"
import { StateProvider } from "./context/context"
import { BrowserRouter, Switch, Route } from "react-router-dom"

export default function Layout({ children }) {
	return (
    <StateProvider>
      <BrowserRouter>
        <Switch>
          { children }
        </Switch>
      </BrowserRouter>
		</StateProvider>
  )
}
