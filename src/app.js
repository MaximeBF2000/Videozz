import "regenerator-runtime/runtime"
import React from "react"
import ReactDOM from "react-dom"
import Routes from "./Routes"
import { Route } from "react-router-dom"
import "./app.scss"

import HomePage from "./routes/HomePage"
import SearchPage from "./routes/SearchPage"
import NotFoundPage from "./routes/NotFoundPage"

function App() {
	return (
		<Routes>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/search">
        <SearchPage />
      </Route>
      <Route path="*" children={NotFoundPage} />
    </Routes>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
