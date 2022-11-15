import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Movies.css';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';


import { Swiper, SwiperSlide  } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MoviesSliderCarousel from "./MoviesSliderCarousel";

const Movies = () => {
  const TREND_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=4e44d9029b1270a757cddc766a1bcb63";
  const NOW_PLAYING_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1";
  const Popular_API = "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1" ;

  const [trendMovies, setTrendMovies] = useState([]);
  const [nowPLayingMovies, setNowPLayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);


  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let timerId;
    if (loading) {
      timerId = setTimeout(async () => {
        await axios.get(TREND_URL)
          .then(res => {
            setTrendMovies(res.data.results)
          })
        await axios.get(NOW_PLAYING_URL)
          .then(res => {
            setNowPLayingMovies(res.data.results)
          })
          await axios.get(Popular_API)
          .then(res => {
            setPopularMovies(res.data.results.slice(0,15))
          })

        setLoading(false)
      });
    } return () => clearTimeout(timerId);

  }, [loading]);


  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
      
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1.2,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1.5,
        
        }
      },
      {
        breakpoint: 543,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1.7
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1.2
        }
      }
    ]
  };

  return (
    <div className="movies-page row w-100 p-0 m-0 justify-content-center  text-white">
      <div className="col-12">
        <MoviesSliderCarousel/>
      </div>

      <hr className='col-12 ' style={{ height: '3px' }} /> 

      <div className="trending-movies col-11 ">
        <h3 className="py-2 movie-h">TRENDING MOVIES</h3>
       <Slider {...settings} className="mySwiper">
          {trendMovies?.map(movie => (
            <div className="small-slider"  key={movie.id}>
              <Link  to={`/movie/${movie.id}`}>      
                <motion.button whileHover={{ scale: 1.1 }}  className="btn-image" style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.poster_path}")` }}>
                  <div className="swiper-movies-details text-white">
                   <h3 className='swiper-movies-h movie-h'>{ movie.original_title}</h3>
                  </div>  
                </motion.button>                                  
             </Link>
            </div>
          ))}

        </Slider>
      </div>

    {/* <hr className='col-12 ' style={{ height: '3px' }} /> */}

      <div className="nowplaying-movies  col-11 ">
        <h3 className="py-2 movie-h">NOW PLAYING MOVIES</h3>
        <Slider {...settings} className="mySwiper">
          {nowPLayingMovies?.map(movie => (
            <div className="small-slider" key={movie.id} >
              <Link  to={`/movie/${movie.id}`}>      
              <motion.button key={movie.id} whileHover={{ scale: 1.1 }}  className="btn-image" style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.poster_path}")` }}>
                  <div  className="swiper-movies-details text-white">
                   <h3  className='swiper-movies-h movie-h'>{ movie.original_title}</h3>
                  </div>  
                </motion.button>                                  
             </Link>
            </div>
          ))}
        </Slider>

      </div>
      <hr className='col-12 ' style={{ height: '3px' }} />

      <div className="row justify-content-center p-5 w-100">
          <h3 className="d-flex justify-content-center p-3 movie-h ">
          POPULAR RIGHT NOW
          </h3>
          <hr className='col-10 ' style={{ height: '1px' }} />

      { popularMovies?.map(movie => (
            <Link className=" col-xl-2 col-lg-3 col-md-4 col-sm-5 col-12 m-2 p-0 "  key={movie.id} to={`/movie/${movie.id}`}>
              <motion.button whileHover={{ scale: 1.1 }} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.poster_path}")` }} 
               className='movies-cart text-white text-start p-0'>    
                <div className='cards_overlay p-2'>
                    <div className='card-content '>                                        
                    <h1 className=' fw-bold fs-3'>{ movie.original_title}</h1>
                    <div className='row my-0 '>
                        <span className='fw-bold col-6 '>
                        { movie.release_date }
                        </span>
                        <span className='fw-bold col-6'>
                            { movie.vote_average }
                            <i className="fas fa-star" />{" "}
                        </span>
                    </div>
                    <p className='movie-caption' >{ movie.overview.substring(0, 200) }.... </p>
                    </div> 
                </div >      
              </motion.button>          
            </Link>  
        ))}

      </div>

      <Footer />
    </div>
  )
}

export default Movies
