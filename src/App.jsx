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
        <Route path="/:movie" element={<Movie />} />
      </Route>
    </Routes>
  )
}