// Viser en liste med filmer
// Mottar filmdata som props og renderer ett MovieCard per film
import MovieCard from "./MovieCard"

export default function MovieList({ movies, title }) {
  // // Hvis listen er tom eller ikke finnes, rendres ingenting
  if (!movies || movies.length === 0) return null
  //  // Lager en unik id til overskriften for bedre tilgjengelighet (aria-labelledby)
  const headingId = `section-title-${title?.toLowerCase().replace(/\s+/g, "-")}`

  // Renderer en seksjon med overskrift og en liste av filmkort.
  // Hver film i listen vises ved hjelp av MovieCard-komponenten.
  return (
    <section className="section" aria-labelledby={headingId}>
      <h2 id={headingId} className="section__title">{title}</h2>

      <ul className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </section>
  )
}