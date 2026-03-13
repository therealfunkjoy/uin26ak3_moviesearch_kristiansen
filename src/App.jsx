//  Definerer routene i applikasjonen
//  Bruker Layout som felles struktur rundt sidene
//  Inneholder både forside og dynamisk rute for valgt film


import "./App.css"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Movie from "./pages/Movie"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:movie/:imdbID" element={<Movie />} />
      </Route>
    </Routes>
  )
}