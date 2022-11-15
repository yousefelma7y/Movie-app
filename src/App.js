import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navbar/navbar";
import Home from "./components/Home";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import Movie from "./components/Movies/Movie";
import Tv from "./components/Series/Tv";

import './App.css';
import "react-loading-skeleton/dist/skeleton.css";
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  return (
    <BrowserRouter>
    <Navigation/> 
      <Routes>
        <Route exact path="/"  element={<Home/>}/>
        <Route path="/movies" element={<Movies/>} />
        <Route path="movie/:id" element={<Movie/>} />
        <Route path="tv/:id" element={<Tv/>} />
        <Route path="/series" element={<Series/>}/>  
            

     </Routes>
  </BrowserRouter>
  );
}

export default App;
