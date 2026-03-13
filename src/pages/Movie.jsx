// Viser detaljsiden for en valgt film
// Henter filmdata fra OMDb basert på imdbID i URL-en

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function Movie() {
  // Henter slug og imdbID fra URL-en ved hjelp av useParams-hooken fra react-router-dom
  const { movie: movieSlug, imdbID } = useParams()

  // State for filmdata, lastestatus og eventuelle feil
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  //Henter API nøkkel fra .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  
  // Hent filmdata når imdbID i URL endrer seg
  useEffect(() => {
    async function fetchMovie() {
      setLoading(true)
      setError("")

      try {
        // // Hvis imdbID mangler i URL, avbryt og vis feilmelding
        if (!imdbID) {
          setMovie(null)
          setError("Mangler imdb-id i URL (f.eks. ?imdb=tt1234567).")
          return
        }

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`
        )
        const data = await res.json()

        // Hvis Response er "False", betyr det at filmen ikke ble funnet
        if (data.Response === "False") {
          setMovie(null)
          setError(data.Error || "Fant ikke filmen.")
        } else {
          setMovie(data)
        }
      } catch (e) {
        setError("Noe gikk galt ved henting av filmdata.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [imdbID, apiKey])
  // Bruker API-tittel hvis tilgjengelig, ellers slug fra URL
  const title = movie?.Title ?? decodeURIComponent(movieSlug || "")

  // Renderer filmsiden.
  //  Viser tittel, plakat og detaljer om filmen,
  //  eller feilmelding / loading dersom data ikke er tilgjengelig.
  return (
    <main className="moviepage">
      <Link className="backlink" to="/">Hjem</Link>
        <header className="moviepage__header">
          <h1 className="moviepage__title">{title}</h1>
          {imdbID ? <p className="moviepage__meta">IMDb: {imdbID}</p> : null}
        </header>

      {loading ? <p>Laster…</p> : null}
      {!loading && error ? <p role="alert">{error}</p> : null}

      {!loading && !error && movie ? (
        <section className="moviepage__content" aria-label="Filmdetaljer">
          <figure className="moviepage__poster">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`Plakat: ${movie.Title}`} />
            ) : (
              <figcaption>Ingen plakat</figcaption>
            )}
          </figure>

          <section className="moviepage__details">
            <h2>Detaljer</h2>
            <p><strong>År:</strong> {movie.Year}</p>
            <p><strong>Sjanger:</strong> {movie.Genre}</p>
            <p><strong>Regissør:</strong> {movie.Director}</p>
            <p><strong>Skuespillere:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </section>
        </section>
      ) : null}
    </main>
  )
}