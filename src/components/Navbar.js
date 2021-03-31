import React, { useState, useEffect, useCallback } from "react"
import { useStore } from "../context/context"
import { Link, useHistory } from "react-router-dom"
import useLocalStorage from "../modules/useLocalStorage"
import SearchIcon from "@material-ui/icons/Search"
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness"

export default function Navbar() {
	const [theme, setTheme] = useLocalStorage("theme", "light")
	const [searchValue, setSearchValue] = useState("")
	const { dispatch } = useStore()
  const [isSolid, setIsSolid] = useState(false)
  const history = useHistory()

  const solidify = useCallback(() => {
    if (theme === "dark") {
      document.body.classList.add("dark")
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight - 200) setIsSolid(true)
      else setIsSolid(false)
    })
  }, [theme])

	useEffect(() => {
    solidify()
		return () => window.removeEventListener("scroll", solidify)
	}, [])

	const toggleDarkMode = () => {
		if (theme == "light") {
			setTheme("dark")
			document.body.classList.add("dark")
		} else {
			setTheme("light")
			document.body.classList.remove("dark")
		}
	}

	const search = e => {
    e.preventDefault()
    dispatch({ type: "SET_SEARCH", payload: searchValue })
    if(searchValue) history.push("/search")
	}

	return (
		<div className={`navbar ${isSolid && "solid"}`}>
        <div className="logo">
          <Link to="/">
            <h1> VideOzz™ </h1>
          </Link>
        </div>
			<form className="searchBox" onSubmit={search}>
				<input
					type="text"
					className="search"
					placeholder="Search by name, author..."
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
        <button type="submit">
          <SearchIcon className="searchIcon" />
        </button>
			</form>
			<button
				className="toggle_darkmode"
				onClick={toggleDarkMode}
				title="Toggle dark mode"
			>
				<SettingsBrightnessIcon />
			</button>
		</div>
	)
}
