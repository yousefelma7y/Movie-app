import React , {useState} from 'react';
import { Nav } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import './Search.css';

const Search = () => {


    const [query , setQuery] = useState('') ; 
    const [results , setResults] = useState([]);
   


    const searchPar = async (e) =>{
        e.preventDefault() ;
        
        const MultiSearch =`https://api.themoviedb.org/3/search/multi?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}&include_adult=false`;
        // const MovieSearch =`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}&include_adult=false`;
        try {  
            const res = await fetch(MultiSearch) ;
            const data = await res.json() ;
            setResults(data.results.slice(0,10));
            console.log(data.results.slice(0,6));
            
         } catch(err){
            console.log("No Results For That Search ")
         }
      }

   

  return (
   <div className='row  justify-content-center'>
    <form className="col-xl-4 col-lg-6 col-9 p-0 m-0" onChange={searchPar} onClick={searchPar}>     
        <input  className='search-input col-9 p-3 ' type='text'
         name="query"  value={query} placeholder={'Enter Movie, Serie Title'}
         onChange={(e)=>setQuery(e.target.value)}/>
        <button className='search-icon col-2 mx-1'  >
         <FaSearch/>
        </button>
    </form>
    <div className='row search-container mt-3 justify-content-center'>
    {results.length != 0 ? results?.filter(result=>result.poster_path)?.map(result => (  
         <Nav.Link  key={result.id} style={{  backgroundImage: `url("https://image.tmdb.org/t/p/original${result && result.poster_path}")` }} 
         className='movie-search-cart col-xl-2 col-lg-3 col-md-4 col-sm-5 col-8 m-1 p-0 text-white text-start'
         href={`/${result.media_type}/${result.id}`}>  
             <div className='cards_overlay p-2' >
                 <div className='card-content'>                                        
                 <h1 className=' fw-bold fs-3'>{ result.original_title}{ result.name}</h1>
                 <div className='row my-0 '>
                     <span className='fw-bold col-6 '>
                        { result.release_date }{ result.first_air_date }
                        </span>
                     <span className='fw-bold col-6'>
                         { result.vote_average }
                         <i className="fas fa-star" />{" "}
                     </span>
                 </div>
                 </div> 
             </div>
             
         </Nav.Link>
     )) : 'No Results'}
    </div>

    </div>
  )
}

export default Search
