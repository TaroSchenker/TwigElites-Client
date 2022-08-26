import React from 'react'
import { Container, Col, Row } from "react-bootstrap";

const Signin = () => {
  return (
    <div className="packet">
        <form className="sign-up overlay">
            <h2 className="caveat fm-header">Fellow TwigElite</h2>
            <br/>
            <input className="caveat" type="text" placeholder="NAME"/>
            <br/>
            <input className="caveat" type="password" placeholder="PASSWORD 1"/>
            <br/>
            <input className="special-btn caveat" type="submit" value="LOGIN"/>
        </form>
    </div>
  )
}

export default Signin