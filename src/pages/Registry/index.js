import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Signup from "../../components/Signup";
import Signin from "../../components/Signin";
import { useState } from "react";
import Header from "../../layout/Header"

const Registry = () => {
    const [isShownLog, setIsShownLog] = useState(false);

    const handleClick = (e) => {
        e.preventDefault()
        setIsShownLog(current => !current);
      };

    return (
        <Container fluid>
        <Row>
            <Col className="bg-warning p-0">
                <Header />
            </Col>
        </Row>
        <Row className="bg-warning" style={{ height: "80vh" }}>
            <Col className="bg-dark-blue d-flex justify-content-center align-items-center flex-column main">
                { isShownLog ? <Signin /> : <Signup /> }
                { isShownLog ? <p className="caveat text-white">Don't have an account? Signup <a className="txt-blue" href="#" onClick={e => handleClick(e)}>here</a></p> : <p className="caveat text-white">Already a TwigElite? Login <a className="txt-blue" href="#" onClick={e => handleClick(e)}>here</a></p> }
                {/* <button className="p-3" onClick={e => handleClick(e)}></button> */}
            </Col>
        </Row>
        </Container>
    );
};

export default Registry;