import React, { useState ,useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import HomeList from './HomeList';
import Skeleton from 'react-loading-skeleton'
import axios from 'axios';
import Footer from './Footer';


const Home = () => {
  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US" ;


const [ popularMovies, setPopularMovies ] = useState([])
const [loading ,setLoading] = useState(true) ;

useEffect(() => {

  let timerId;
    if(loading) { 
      timerId = setTimeout(async () => {
        await axios.get(API_URL)
        .then(res => {
          setPopularMovies(res.data.results)
        })
        setLoading(false)
      });  
  } return () =>clearTimeout(timerId);
   
}, [loading]);
 


const Loading = () => {
  return(

  <div>
  <Skeleton className='carousel-skelton'/> 
  </div>
    
  );
} ;
const ShowMovies =() =>{
 return(
  <>
   <Carousel fade>
        { popularMovies?.map(movie => ( 
        <Carousel.Item  key={movie.id} >
          <img className="posterImage w-100" src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className='posterImage__overlay'>
            <h1 className=' fw-bold fs-1'>{ movie.original_title}</h1>
            <div >
                <span className='m-4'>
                { movie.release_date }
                </span>
                <span >
                    { movie.vote_average }
                    <i className="fas fa-star" />{" "}
                </span>
            </div>
            <p className=' d-md-flex d-none d-print-block'>{ movie.overview }</p>
          </Carousel.Caption>
        </Carousel.Item>                 
        ))}
  </Carousel>
  </>
 )
};
  return (
    <div className='home-top w-100 '>

    <div className='col-12 d-flex justify-content-center'>
      <div className=' mt-lg-2 col-xl-7 col-lg-9 col-12'>
         {loading ? <Loading/> : <ShowMovies/>}
      </div>
    </div>
    
  <HomeList/>

  <Footer/>

   </div>
  )
}

export default Home
