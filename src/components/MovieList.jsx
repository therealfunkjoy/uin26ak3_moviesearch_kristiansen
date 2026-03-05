import MovieCard from "./MovieCard"

export default function MovieList({ movies, title }) {
  if (!movies || movies.length === 0) return null

  const headingId = `section-title-${title?.toLowerCase().replace(/\s+/g, "-")}`

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