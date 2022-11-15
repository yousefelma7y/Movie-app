import React from 'react'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Canvas from './Canvas';
import './navbar.css';
import Search from './Search';
import { BiMoviePlay } from 'react-icons/bi';

const Navigation = () => {
 

  return (
    <Navbar className='main-navbar' collapseOnSelect variant="dark"  expand="lg">
    <Container fluid className=''>   
       <Navbar.Brand href="/" className='nav-logo p-2 fw-bold rounded '><BiMoviePlay/> <span className='px-2'>LIGHT’S OUT</span>  </Navbar.Brand>
       <Canvas/>
    </Container>
  </Navbar>
  )
}

export default Navigation
