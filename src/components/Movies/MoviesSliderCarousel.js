import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import './MoviesSliderCarousel.css';

const MoviesSliderCarousel = () => {

  const UPCOMING_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=4e44d9029b1270a757cddc766a1bcb63&page=1";


  const [upComing, setUpComing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let timerId;
    if (loading) {
      timerId = setTimeout(async () => {
        await axios.get(UPCOMING_URL)
          .then(res => {
            setUpComing(res.data.results)
          })
        setLoading(false)
      });
    } return () => clearTimeout(timerId);

  }, [loading]);


  return (
    <>
   
  <Swiper className='py-5 d-lg-flex d-none d-print-block'
    modules={[Navigation ,Autoplay  ]}
    autoplay={{
      delay:3000,
    }}
    spaceBetween={40}
    slidesPerView={3}
    navigation
    loop={true}
  >
    {upComing?.map(movie => ( 
      <SwiperSlide key={movie.id} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}")` }}  >
       <Link className="big-slider-content text-white" to={`/movie/${movie.id}`}> 
         <h1 className=' fw-bold py-3 '>{ movie.original_title}</h1>
            <div className="py-2 fw-bold">
                <span >
                { movie.release_date }
                </span>
                <span className='m-3'>
                    { movie.vote_average }
                    <i className="fas fa-star" />{" "}
                </span>
            </div>
         <p className=''>{ movie.overview.substring(0, 300) }...</p>                
       </Link>
      </SwiperSlide>
       
    ))}
  
  </Swiper> 
  <Swiper className='py-5 d-lg-none d-flex d-print-block'
    modules={[Navigation ,Autoplay]}
    autoplay={{
      delay:3000,
    }}
    spaceBetween={40}
    slidesPerView={3}
    navigation
    loop={true}
  >
    {upComing?.map(movie => ( 
     <SwiperSlide key={movie.id} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.poster_path}")` }}  >
       <Link className="small-slider-content text-white" to={`/movie/${movie.id}`}>
         <h3 className=' fw-bold py-3 '>{ movie.original_title}</h3>
            <div className="py-2 fw-bold">
                <span >
                { movie.release_date }
                </span>
                <span className='m-3'>
                    { movie.vote_average }
                    <i className="fas fa-star" />{" "}
                </span>
            </div>
         <p className=''>{ movie.overview.substring(0, 100) }...</p>                                
       </Link>
     </SwiperSlide>      
    ))}
  </Swiper> 
 
  </>
  )
}

export default MoviesSliderCarousel
