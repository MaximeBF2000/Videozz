import { useState, useEffect } from "react"

function getLocal(key, initialValue){
  const savedValue = localStorage.getItem(key)
  if(savedValue) return savedValue

  if(initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(() => {
    return getLocal(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value])

  return [value, setValue]
}