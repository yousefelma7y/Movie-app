import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './SeriesSliderCarousel'

const SeriesSliderCarousel = () => {
const AIRINGTODAY_URL = "https://api.themoviedb.org/3/tv/airing_today?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1";


  const [airingToday, setAiringToday] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let timerId;
    if (loading) {
      timerId = setTimeout(async () => {
        await axios.get(AIRINGTODAY_URL)
          .then(res => {
            setAiringToday(res.data.results)
          })
        setLoading(false)
      });
    } return () => clearTimeout(timerId);

  }, [loading]);
  return (
    <>
   
    <Swiper className='py-5 d-lg-flex d-none d-print-block'
      modules={[Navigation,Autoplay ]}
      autoplay={{
        delay:3000,
      }}
      spaceBetween={40}
      slidesPerView={3}
      navigation
      loop={true}
    >
      {airingToday?.map(series => ( 
        <SwiperSlide key={series.id} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${series.backdrop_path}")` }}  >
         <Link className="big-slider-content text-white" to={`/tv/${series.id}`}> 
           <h1 className=' fw-bold py-3 '>{ series.original_name}</h1>
              <div className="py-2 fw-bold">
                  <span >
                  { series.first_air_date }
                  </span>
                  <span className='m-3'>
                      { series.vote_average }
                      <i className="fas fa-star" />{" "}
                  </span>
                  <div className="py-1 fw-bold">
                
            </div>
              </div>
           <p className=''>{ series.overview.substring(0, 300) }...</p>                
         </Link>
        </SwiperSlide>
         
      ))}
    
    </Swiper> 
    <Swiper className='py-5 d-lg-none d-flex d-print-block'
      modules={[Navigation,Autoplay ]}
      autoplay={{
        delay:3000,
      }}
      spaceBetween={40}
      slidesPerView={3}
      navigation
      loop={true}
    >
      {airingToday?.map(series => ( 
       <SwiperSlide key={series.id} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${series.poster_path}")` }}  >
         <Link className="small-slider-content text-white" to={`/tv/${series.id}`}>
           <h3 className=' fw-bold py-3 '>{ series.original_name}</h3>
              <div className="py-2 fw-bold">
                  <span >
                  { series.first_air_date  }
                  </span>
                  <span className='m-3'>
                      { series.vote_average }
                      <i className="fas fa-star" />{" "}
                  </span>
              </div>
           <p className=''>{ series.overview.substring(0, 100) }...</p>                                
         </Link>
       </SwiperSlide>      
      ))}
    </Swiper> 
   
    </>
  )
}

export default SeriesSliderCarousel
