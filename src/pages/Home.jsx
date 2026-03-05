import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import MovieList from "../components/MovieList"

// Liste over IMDb-ID-er for James Bond-filmene, brukt for å hente default-liste på Home-siden.
// Det kom opp mye rart med søk på "James Bond" i OMDb,
// så jeg valgte å hardkode en liste med kjente Bond-filmer for å sikre at det alltid vises relevante resultater før søk.
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
  const [movies, setMovies] = useState([]) // søkresultater
  const [defaultMovies, setDefaultMovies] = useState([]) // bond
  const [hasSearched, setHasSearched] = useState(false)
  // Henter api-nøkkel fra .env og gjør den tilgjengelig i koden. Vite bruker import.meta.env for dette.
  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const [searchParams] = useSearchParams()
  const qFromUrl = searchParams.get("q") || ""



// Hent defaultliste (minst 10) James Bond-filmer når siden laster
// Promise.all brukes for å gjøre flere fetch-kall parallelt, 
// og vi venter på at alle skal bli ferdige før vi oppdaterer state med resultatene.
  useEffect(() => {
  const fetchDefaultMovies = async () => {
    try {
      const responses = await Promise.all(
        BOND_IDS.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then((res) =>
            res.json()
          )
        )
      )

      // filer bort evt. feilrespons
      setDefaultMovies(responses.filter((m) => m.Response !== "False"))
    } catch (err) {
      console.error(err)
    }
  }

  fetchDefaultMovies()
}, [apiKey])


// Hent søk fra URL og gjør søk når q i URL endrer seg
useEffect(() => {
  const q = qFromUrl.trim()

  // Hvis ingen query i URL, vis default (Bond)
  if (q.length < 3) {
    setHasSearched(false)
    setMovies([])
    return
  }

  // Hvis query finnes, gjør søk
  const fetchSearch = async () => {
    setHasSearched(true)
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${apiKey}`
      )
      const data = await res.json()
      setMovies(data.Search || [])
    } catch (err) {
      console.error(err)
    }
  }

  fetchSearch()
}, [qFromUrl, apiKey])



const uniqueMovies = Array.from(new Map(movies.map((m) => [m.imdbID, m])).values())
const showEmpty = hasSearched && uniqueMovies.length === 0

// Vis Bond-lista igjen hvis søk ga 0 treff (samtidig som vi kan vise feilmelding)
const moviesToShow = showEmpty
  ? defaultMovies
  : (hasSearched ? uniqueMovies : defaultMovies)

const listTitle = showEmpty
  ? "James Bond-filmer"
  : (hasSearched ? "Resultater" : "James Bond-filmer")




// Henter data fra api og viser enten søkresultater eller defaultliste (Bond).
// Avhengig av om det er gjort et søk eller ikke. Hvis søk ga 0 treff, vises defaultlisten igjen
   return (
  <> 
    <main className="container">
    {qFromUrl.trim().length >= 3 && (
      <Link className="backlink" to="/">← Tilbake</Link>
    )}

    <MovieList movies={moviesToShow} title={listTitle} />
    {showEmpty && <p className="empty">Ingen filmer funnet.</p>}
  </main>
  </>
) 
}