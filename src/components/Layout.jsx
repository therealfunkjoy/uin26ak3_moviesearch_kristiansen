// Felles layout for sidene i appen
// Viser Topbar øverst og rendrer innholdet fra routene under
import { Outlet } from "react-router-dom"
import Topbar from "./Topbar"


export default function Layout() {

  // Renderer toppnavigasjonen og siden som tilhører den aktive routen.
  // Outlet viser komponenten som er definert i App.jsx.
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  )
}