import React, { useEffect, useState } from 'react'
import './Home.css'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeList = () => {
    const Popular_API = "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US" ;
const TopRate_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1" ;
const UpComing_API = "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US" ;


const [ moviesdata, setMoviesdata ] = useState([]);
const [active1 ,setActive1] = useState(true);
const [active2 ,setActive2] = useState(false);
const [active3 ,setActive3] = useState(false);
const [loading ,setLoading] = useState(true) ;




useEffect(() => {
  let timerId;
  if(loading) { 
    timerId = setTimeout(async () => {
      await axios.get(Popular_API)
      .then(res => {
        setMoviesdata(res.data.results.slice(0,9))
      })
      setLoading(false)
    });  
} return () =>clearTimeout(timerId);
 
}, [loading]);





  const getPopularData = () => {
    fetch(Popular_API)
    .then(res => res.json())
    .then(data => setMoviesdata(data.results.slice(0,9)))

    setActive1(current=> current= true)
    setActive2(current=> current = false)
    setActive3(current=> current = false)


  };

  const getTopRateData = () => {
    fetch(TopRate_API)
    .then(res => res.json())
    .then(data => setMoviesdata(data.results.slice(0,9)))

    setActive2(current=> current= true)
    setActive1(current=> current = false)
    setActive3(current=> current = false)

  

  };
  const getUpComingData = () => {
    fetch(UpComing_API)
    .then(res => res.json())
    .then(data => setMoviesdata(data.results.slice(0,9)))
    
    setActive3(current=> current= true)
    setActive1(current=> current = false)
    setActive2(current=> current = false)

  };




  const Loading = () => {
    return(
     <>
     <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
     <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0">
      <Skeleton className="skelton-cart" height={400}/>
     </div>
   
     </>
    );
  } ;
  const ShowMovies =() =>{
    return(
     <>
       
        { moviesdata?.map(movie => (
            
            <Link style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${movie && movie.poster_path}")` }} 
            className='movie-cart col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 m-1 p-0 text-white  text-start'  key={movie.id}
            to={`/movie/${movie.id}`}>
                
                <div className='cards__overlay p-2'>
                    <div className='card-content'>                                        
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
                    <p className='movie-caption mt-3' >{ movie.overview.substring(0, 200) }.... </p>
                    </div> 
                </div>
                
            </Link>
            
        ))}
      
    </>
 )
};
  return (
    <div className='col-12 row pt-5 d-flex justify-content-center'>
        <hr className=' col-10' style={{height: '3px'}}/>

        <div className='home-card row col-xl-8 col-10  p-3 d-flex justify-content-center mb-4'>

            <button className={active1? 'active-btn   m-2 p-2 col-md-3 col-3' : 'home-btn    m-2 p-2 col-md-3 col-3'} onClick={getPopularData } >Popular</button>
            <button  className={active2? 'active-btn   m-2 p-2 col-md-3 col-4' : 'home-btn    m-2 p-2 col-md-3 col-4'} onClick={getTopRateData} >Top Rate</button>
            <button  className={active3? 'active-btn   m-2 p-2 col-md-3 col-3' : 'home-btn   m-2 p-2 col-md-3 col-3'} onClick={getUpComingData}>UpComing</button>
            <div className='row mt-5 d-flex justify-content-center'>
            {loading ? <Loading/> : <ShowMovies/>}
            </div>
          
        </div>
    </div>
  )
}

export default HomeList
