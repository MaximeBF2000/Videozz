import React from "react"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
	return (
		<div className="notFoundPage">
			<h1>Page not found</h1>
      <Link to="/">
        <button className="goBackBtn">Go back</button>
      </Link>
		</div>
	)
}
