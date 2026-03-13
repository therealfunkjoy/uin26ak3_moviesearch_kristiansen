// Inngangspunkt for React-appen
// Wrapper for BrowserRouter slik at vi kan bruke routing i hele appen


import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Rendrer React-appen inn i root-elementet i index.html
// BrowserRouter gjør det mulig å bruke Route, Routes, Link og useParams i appen
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
