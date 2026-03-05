import { Link } from "react-router-dom"

function slugify(title = "") {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-") // bokstaver/tall -> bindestrek på alt annet
    .replace(/(^-|-$)/g, "")
}

export default function MovieCard({ movie }) {
  const title = movie?.Title ?? "Ukjent tittel"
  const year = movie?.Year ?? ""
  const poster = movie?.Poster
  const imdbID = movie?.imdbID

  const slug = slugify(title)
  const to = `/${slug}?imdb=${encodeURIComponent(imdbID)}`

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