import React from 'react'
import { Container, Col, Row } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="packet">
        <form className="sign-up overlay">
            <h2 className="caveat fm-header">Become a TwigElite</h2>
            <input className="caveat" type="text" placeholder="EMAIL"/>
            <br/>
            <input className="caveat" type="text" placeholder="NAME"/>
            <br/>
            <input className="caveat" type="password" placeholder="PASSWORD 1"/>
            <br/>
            <input className="caveat" type="password" placeholder="PASSWORD 2"/>
            <br/>
            <input className="special-btn caveat" type="submit" value="JOIN"/>
        </form>
    </div>
  )
}

export default Sidebar