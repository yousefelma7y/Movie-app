import React, { useEffect, useState } from "react"
import "./Movie.css"
import { useParams } from "react-router-dom"
import { MdSlowMotionVideo } from 'react-icons/md';
import Footer from "../Footer";

const Movie = () => {
  const [moviedata, setMoviedata] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [])
    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMoviedata(data))
    }
  


  return (
    <div className="movie-details text-white">

            {/* the large poster */}
            <div className=" d-md-flex d-none d-print-block">
                <img className="movie_backdrop-img w-100 " src={`https://image.tmdb.org/t/p/original${moviedata ? moviedata.backdrop_path : ""}`} />
            </div>

            <div className="movie-posterpath row justify-content-center p-0 m-0 w-100">

                {/* the small poster */}
                <div className="col-lg-4 col-md-6 col-12 p-0 d-flex justify-content-center">
                    <img className="movie-posterpath-img " src={`https://image.tmdb.org/t/p/original${moviedata ? moviedata.poster_path : ""}`} />
                </div>

                {/* imformation data  */}
                <div className="movie-infos col-lg-8 col-md-6 col-12 px-md-0 p-1 ">
                    <h1 className="movie-name py-1">
                        {moviedata.original_title}
                    </h1>
                    <h5 className="py-1">
                        {moviedata.tagline}
                    </h5>
                    <div className="py-1 fw-bold">
                        <span className="rating"> {moviedata ? moviedata.vote_average : ""} <i className="rating-star fas fa-star" /> </span>
                        <span className="p-3"> ({moviedata.vote_count}) votes</span>
                    </div>
                    <div className="  py-1">{moviedata.runtime} mins</div>
                    <div className="  py-1">{moviedata ? "Release date: " + moviedata.release_date : ""}</div>
                    <div className="  py-1 row w-100 ">
                        {
                            moviedata && moviedata.genres
                                ?
                                moviedata.genres.map(genre => (
                                    <span key={genre.id} className="movie__genre col-lg-2 col-md-3 col-3 mx-3 m-1 p-3"><span className=" " >{genre.name}</span></span>
                                ))
                                :
                                ""
                        }
                    </div>
                    {/* the movie Synopsis */}
                    <div className="pt-3 ">
                        <h1 className="synopsisHeader">Synopsis</h1>
                        <div className="synopsisText">{moviedata.overview}</div>
                    </div>

                    {/* some Links about the movie */}
                    <div className="movie__links pt-5 d-flex justify-content-center w-100">

                        <a href={moviedata.homepage ?moviedata.homepage :"https://www.imdb.com/title/" + moviedata.imdb_id } target="_blank" className="movie-btn homepage-btn " >
                            <p><span>Homepage
                                <i className=" fas fa-external-link-alt px-1"></i>
                            </span></p>
                        </a>

                        <a href={"https://www.imdb.com/title/" + moviedata.imdb_id} target="_blank" className="movie-btn trailer-btn">
                            <p><span >WATCH TRAILER <MdSlowMotionVideo className="fs-4" />

                            </span></p>
                        </a>
                    </div>
                    {/* actores */}
                    <div>
                    
                    </div>

                </div>

                <hr className='col-12 mt-5' style={{ height: '3px' }} />

                <div className="w-100 row  h-100 p-0 mt-5 d-flex justify-content-center">
                    <h1 className="company p-5 text-white d-flex justify-content-center">Production companies:</h1>
                    <div className="movie_production  row p-3">
                        {
                            moviedata && moviedata.production_companies && moviedata.production_companies.map(company => (
                                <>
                                    {

                                        company.logo_path
                                        &&

                                        <span className="productionCompanyImage d-flex justify-content-center col-lg-4 col-md-6  col-12  ">
                                            <img className="movie_productionComapany w-50 py-5" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />

                                        </span>

                                    }
                                </>
                            ))
                        }
                    </div>
                </div>



            </div>
            <Footer />
        </div>
  )
}

export default Movie
