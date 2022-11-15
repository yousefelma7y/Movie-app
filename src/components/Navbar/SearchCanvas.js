import React, { useState } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from 'react-icons/fa';
import Search from './Search';
import './Search.css';
import { AiOutlineClose } from 'react-icons/ai';


const SearchCanvas = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <button variant="primary" onClick={handleShow} className="Search-btn px-3 ">
        <FaSearch/>
      </button>

      <Offcanvas placement="top" show={show} onHide={handleClose} className="row w-100 searchcanvas" >
        <Offcanvas.Header className='justify-content-end'>
         <button type="button" className="closee-btn fs-1 " aria-label="Close" onClick={handleClose}><AiOutlineClose /></button> 
        </Offcanvas.Header>
        <Offcanvas.Body >
         <Search />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default SearchCanvas

