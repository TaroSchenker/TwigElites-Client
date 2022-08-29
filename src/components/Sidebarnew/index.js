import React from 'react';
import { useState } from "react";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import Sighting from "../Sighting";
import Sidebar from "../Sidebar";

const Sidebarnew = ({sightings, menu}) => {
  const [isMenu, setIsMenu] = useState(menu[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    setIsMenu(e.target.textContent)
  };

  console.log(menu, "this is the menu");
  console.log(sightings, "This is the sightings")
  return (
    <div className="sidebar">
      <ul className="list">
        <li className="base item"><a className="s-link link" href="#"><i class="fa-solid fa-circle-chevron-down px-3"></i> {isMenu}</a>
          <ul className="list">
            {menu.map((item) => <li className="sub item text-center"><a className="link" href="#" onClick={e => handleClick(e)}>{item}</a></li>)}
            {/* <li className="sub item"><a className="link" href="#">Top 5</a></li>
            <li className="sub item"><a className="link" href="#">Closest</a></li> */}
          </ul>
        </li>
      </ul>
      <div className="slider d-flex justify-content-center align-items-start">
        {/* {console.log(sightings.sightings)}
      {sightings.map((sighting) => 
        <Sighting sighting={sighting}/>
      )} */}
      
      {/* modal goes her */}
      {/* <Button className="box" onClick={handleShow}>
        Add Twiglet sighting
      </Button> */}

      <button className="box-btn" onClick={handleShow}>
      <i class="fa-solid fa-location-dot"></i>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit your twiglet location here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Sidebar handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
      {/* -------------- */}

      </div>
    </div>
  )
}

export default Sidebarnew