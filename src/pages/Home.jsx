import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("")


const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
//Ikke bruk API-nøkkelen i klartekst i koden, men heller i en .env-fil som ikke legges ut på GitHub. Vite har innebygd støtte
const apiKey = '3143eb'


const getMovies = async()=>{
    try
    {
        const response = await fetch(`${baseUrl}${apiKey}`)
        const data = await response.json()

        console.log(data)

    }
    catch(err){
        console.error(err);
    }
}

const handleChange = (e) => {
    setSearch(e.target.value)
}

  return (
  <main>
    <h1>Forside</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <label>
                Søk etter film
                <input type="Search" placeholder="Harry Potter" onChange={handleChange}></input>
            </label>
        </form>
        <button type="button" onClick={getMovies}>Søk</button>
  </main>
    
  )
  
  
  
}