// Viser forsiden i applikasjonen
// Henter og viser en standardliste med James Bond-filmer før brukeren søker
// Leser søk fra URL og viser søkeresultater fra OMDb API

import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import MovieList from "../components/MovieList"

// Liste over IMDb-ID-er for James Bond-filmene, brukt for å hente default-liste på Home-siden.
// Det kom opp mye rart med søk på "James Bond" i OMDb,
// derfor jeg valgte å hardkode en liste med kjente Bond-filmer for å sikre at det alltid vises relevante resultater før søk.
const BOND_IDS = [
  "tt2382320", // No Time to Die (2021)
  "tt2379713", // Spectre (2015)
  "tt1074638", // Skyfall (2012)
  "tt0830515", // Quantum of Solace (2008)
  "tt0381061", // Casino Royale (2006)
  "tt0246460", // Die Another Day (2002)
  "tt0143145", // The World Is Not Enough (1999)
  "tt0120347", // Tomorrow Never Dies (1997)
  "tt0113189", // GoldenEye (1995)
  "tt0097742", // Licence to Kill (1989)
]

export default function Home() {

  // State for filmer hentet fra søk
  const [movies, setMovies] = useState([])
  // State for standardliste (Bond-filmer)
  const [defaultMovies, setDefaultMovies] = useState([])
  // State for å holde kontroll på om det er gjort søk eller ikke
  const [hasSearched, setHasSearched] = useState(false)
  // State for feilmeldinger ved henting av data
  const [error, setError] = useState("")
  // Henter api-nøkkel fra .env og gjør den tilgjengelig i koden. Vite bruker import.meta.env for dette.
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  // Leser query parameter "q" fra URL for å vite hva som skal søkes etter.
  const [searchParams] = useSearchParams()
  const qFromUrl = searchParams.get("q") || ""



// Hent defaultliste (minst 10) James Bond-filmer når siden laster
// Promise.all brukes for å gjøre flere fetch-kall parallelt, 
// vi venter på at alle skal bli ferdige før vi oppdaterer state med resultatene.
  useEffect(() => {
  const fetchDefaultMovies = async () => {
    try {
      setError("")
      const responses = await Promise.all(
        BOND_IDS.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then((res) =>
            res.json()
          )
        )
      )

      // Filtrer ut eventuelle feil-responser før state oppdateres
      setDefaultMovies(responses.filter((m) => m.Response !== "False"))
    } catch (err) {
      console.error(err)
      setError("Noe gikk galt ved innlastning av default-filmer.")
    }
  }

  fetchDefaultMovies()
}, [apiKey])


// Hent søk fra URL og gjør søk når q i URL endrer seg
// Hvis bruker har skrevet færre enn 3 tegn, vis default-listen (Bond) i stedet for søk
useEffect(() => {
  const q = qFromUrl.trim()

  if (q.length < 3) {
    setHasSearched(false)
    setMovies([])
    return
  }

  const fetchSearch = async () => {
    setHasSearched(true)
    try {
      setError("")
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${apiKey}`
      )
      const data = await res.json()

      // Hvis APIet ikke finner treff, lagres en tom liste i state
      if (data.Response === "False") {
        setMovies([])
      } else {
        setMovies(data.Search || [])
      }
          
    } catch (err) {
      console.error(err)
      setError("Noe gikk galt ved søk.")
    }
  }

  fetchSearch()
}, [qFromUrl, apiKey])


// Fjerner duplikater fra søkeresultat ved å bruke imdbId som unik nøkkel.
const uniqueMovies = Array.from(new Map(movies.map((m) => [m.imdbID, m])).values())
// Brukes for å vise feilmelding om dersom brukeren har søkt, men fikk ikke treff
const showEmpty = hasSearched && uniqueMovies.length === 0

// Vis Bond-lista igjen hvis søk ga 0 treff
const moviesToShow = showEmpty
  ? defaultMovies
  : (hasSearched ? uniqueMovies : defaultMovies)

// Setter riktig overskrift basert på hva som vises i listen
const listTitle = showEmpty
  ? "James Bond-filmer"
  : (hasSearched ? "Resultater" : "James Bond-filmer")

// Rendrer forsiden av appen
// Viser også feilmelding om søket ikke ga treff
// Viser søkereultater eller default-listen
   return (
    <main className="container">
    {qFromUrl.trim().length >= 3 && (
      <Link className="backlink" to="/">Tilbake</Link>
    )}

    {error && <p role="alert">{error}</p>}
    {showEmpty && (
      <p className="empty">Ingen filmer funnet, men sjekk gjerne ut James Bond.</p>
    )}

    <MovieList movies={moviesToShow} title={listTitle} />
  </main>
) 
}