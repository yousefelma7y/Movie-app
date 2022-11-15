import  React,{ useState ,useEffect } from "react";
import axios from 'axios';
import './Series.css';
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
import SeriesSliderCarousel from "./SeriesSliderCarousel";

const Series = () => {
  const TopRated_API = 'https://api.themoviedb.org/3/tv/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1 ';
  const Popular_API = 'https://api.themoviedb.org/3/tv/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1' ;
  const TvOnTheAir_API = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1';

  const [popularTv, setPopularTv ] = useState([])
  const [topRated, setTopRated ] = useState([])
  const [tvOnTheAir, setTvOnTheAir ] = useState([])



  const [loading ,setLoading] = useState(true) ;


  
  useEffect(() => {
  
    let timerId;
      if(loading) { 
        timerId = setTimeout(async () => {
          await axios.get(Popular_API)
          .then(res => {
            setPopularTv(res.data.results)
          })
          await axios.get(TopRated_API)
          .then(res => {
            setTopRated(res.data.results)
          })
          await axios.get(TvOnTheAir_API)
          .then(res => {
            setTvOnTheAir(res.data.results.slice(0,15))
          })
        
          setLoading(false)
        });  
    } return () =>clearTimeout(timerId);
     
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
    <div>
      <SeriesSliderCarousel/>   
    </div>
  
    <hr className='col-12 ' style={{ height: '3px' }} /> 
  
    <div className="trending-movies col-11">
      <h3 className="py-2 movie-h">POPULAR SERIES</h3>
  
      <Slider {...settings} className="mySwiper">
  
        {popularTv?.map(series => (
           <div className="small-slider" key={series.id}>
            <Link   to={`/tv/${series.id}`}>      
              <motion.button whileHover={{ scale: 1.1 }}  className="btn-image" style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${series.poster_path}")` }}>
                <div className="swiper-movies-details text-white">
                 <h3 className='swiper-movies-h movie-h'>{series.original_name}</h3>
                </div>  
              </motion.button>                                  
           </Link>
          </div>
        ))}
  
  </Slider>
    </div>
  
  {/* <hr className='col-12 ' style={{ height: '3px' }} /> */}
  
    <div className="nowplaying-movies  col-11 ">
      <h3 className="py-2 movie-h">TOP RATED SERIES</h3>
      <Slider {...settings} className="mySwiper">
        {topRated?.map(series => (
           <div className="small-slider" key={series.id}>
            <Link   to={`/tv/${series.id}`}>      
            <motion.button whileHover={{ scale: 1.1 }}  className="btn-image" style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${series.poster_path}")` }}>
                <div className="swiper-movies-details text-white">
                 <h3 className='swiper-movies-h movie-h'>{ series.original_name}</h3>
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
            SERIES ON THE AIR NOW
            </h3>
            <hr className='col-10 ' style={{ height: '1px' }} />
  
          { tvOnTheAir?.map(series => (
              <Link key={series.id} className=" col-xl-2 col-lg-3 col-md-4 col-sm-5 col-12 m-2 p-0 " to={`/tv/${series.id}`}>
                <motion.button whileHover={{ scale: 1.1 }} style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${series.poster_path}")` }} 
                 className='movies-cart text-white text-start p-0 w-100' >    
                  <div className='cards_overlay p-2'>
                      <div className='card-content '>                                        
                      <h1 className=' fw-bold fs-3'>{ series.original_name}</h1>
                      <div className='row my-0 '>
                          <span className='fw-bold col-6 '>
                          { series.first_air_date }
                          </span>
                          <span className='fw-bold col-6'>
                              { series.vote_average }
                              <i className="fas fa-star" />{" "}
                          </span>
                      </div>
                      <p className='movie-caption' >{ series.overview.substring(0, 200) }.... </p>
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

export default Series
