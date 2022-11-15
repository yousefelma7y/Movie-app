import { useState } from 'react';


import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import './navbar.css'
import { AiOutlineClose } from 'react-icons/ai';
import SearchCanvas from './SearchCanvas';
import { BiMoviePlay } from 'react-icons/bi';

const Canvas = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
     <Navbar.Toggle onClick={handleShow} className='nav-toggler d-lg-none' aria-controls="responsive-navbar-nav" />
      
      <Alert  className="nav-link d-none d-lg-block m-auto fs-3 p-0 " >
         <Nav className=" alert-nav-link" navbarScroll>
            <Nav.Link className='px-4' href="/">Home</Nav.Link>
            <Nav.Link className='px-4' href="/movies">Movies</Nav.Link>
            <Nav.Link  href="/series">Series</Nav.Link>
            <SearchCanvas/>
        </Nav>
         
      </Alert>

      <Offcanvas className='slide-canovas' show={show} onHide={handleClose} responsive="lg" >
        <Offcanvas.Header>
         
        <Navbar.Brand href="/" className='nav-logo p-2 text-white fw-bold rounded '>
          <BiMoviePlay/> <span className='px-2'>LIGHT’S OUT</span>
        </Navbar.Brand> 
        <button type="button" className="close-btn fs-3" aria-label="Close" onClick={handleClose}><AiOutlineClose /></button>    
        
        </Offcanvas.Header>
       
        <Offcanvas.Body className='d-lg-none'>
         <Nav className="nav-link  fs-2" navbarScroll>
            <Nav.Link className='align-self-center  mt-4' href="/">Home</Nav.Link>
            <Nav.Link className='align-self-center  mt-4' href="/movies">Movies</Nav.Link>
            <Nav.Link className='align-self-center   mt-4' href="/series">Series</Nav.Link>
         </Nav>
        
        <SearchCanvas />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Canvas
