// Representerer én film i film-listen
// Viser plakat, tittel og år
// Lenker videre til detaljsiden for filmen

import { Link } from "react-router-dom"


// Gjør en filmtittel om til en URL-vennlig slug.
// Fjerner spesialtegn og erstatter mellomrom med bindestreker.
function slugify(title = "") {
  return title
    .toLowerCase()
    .trim()
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Unicode_property_escapes
    // Erstatter alle tegn som ikke er bokstaver eller tall med bindestrek
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    // Fjerner bindestreker i starten eller slutten av strengen
    .replace(/(^-|-$)/g, "")
}

export default function MovieCard({ movie }) {
  // Henter relevant filmdata fra props
  const title = movie?.Title ?? "Ukjent tittel"
  const year = movie?.Year ?? ""
  const poster = movie?.Poster
  const imdbID = movie?.imdbID
  
  // Lager slug og URL til detaljsiden
  const slug = slugify(title)
  const to = `/${slug}/${imdbID}`

  // Renderer et filmkort i listen.
  // Kortet fungerer som en lenke til filmens detaljside.
  return (
    <li>
      <article className="moviecard">
        <Link to={to} className="moviecard__link" aria-label={`Åpne ${title}`}>
          <figure className="moviecard__media">
            {poster && poster !== "N/A" ? (
              <img className="moviecard__img" src={poster} alt={`Plakat: ${title}`} />
            ) : (
              <figcaption className="moviecard__fallback">Ingen plakat</figcaption>
            )}
          </figure>

          <header className="moviecard__header">
            <h3 className="moviecard__title">{title}</h3>
            <p className="moviecard__meta">{year}</p>
          </header>
        </Link>
      </article>
    </li>
  )
}