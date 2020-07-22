import React, { useEffect, useState } from 'react'
import useLocalStorage from "../modules/useLocalStorage"

export default function Navbar() {
  const [theme, setTheme] = useLocalStorage("theme", "light")
  const [isSolid, setIsSolid] = useState(false)

  useEffect(() => {
    if(theme === "dark"){
      document.body.classList.add("dark")
    }
    
    window.addEventListener("scroll", () => {
      if(window.scrollY > window.innerHeight - 200) setIsSolid(true)
      else setIsSolid(false)
    })
    return () => window.removeEventListener("scroll")
  }, [])

  const toggleDarkMode = () => {
    if(theme == "light"){
      setTheme("dark")
      document.body.classList.add("dark")
    } else {
      setTheme("light")
      document.body.classList.remove("dark")
    }
  }

  return (
    <div className={`navbar ${isSolid && "solid"}`}>
      <div className="logo"><h1>  VideOzz™  </h1></div>
      <button className="toggle_darkmode" onClick={toggleDarkMode}>CHANGE THEME</button>
    </div>
  )
}
