import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

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

          <button className="search__button" type="submit">Søk</button>
        </form>
      </nav>
    </header>
  )
}