import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

// En enkel Search-ikon-komponent som vi kan gjenbruke i både Topbar og Movie-siden.
  // SVG-en er hentet fra https://feathericons.com/?query=search
  // Støtter tilgjengelighet
  function SearchIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}


export default function Topbar() {
  const [q, setQ] = useState("")

  // useNavigate er en hook som gir oss en funksjon for å programmatiskt navigere til en annen URL.
  // https://reactrouter.com/api/hooks/useNavigate
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed.length < 3) return
    navigate(`/?q=${encodeURIComponent(trimmed)}`)
  }

  

  return (
    <header className="topbar">
      <nav className="topbar__inner" aria-label="Hovedmeny og søk">
        <Link className="brand" to="/">UaIN</Link>

        <form className="search" onSubmit={onSubmit} role="search">
          <label className="sr-only" htmlFor="q">Søk etter film</label>

          <input
            id="q"
            className="search__input"
            type="search"
            placeholder="Harry Potter"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <button className="search__button" type="submit" aria-label="Søk"> <SearchIcon /></button>
        </form>
      </nav>
    </header>
  )
}