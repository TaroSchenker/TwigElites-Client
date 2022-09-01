import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Signup from "../../components/Signup";
import Signin from "../../components/Signin";
import { useState } from "react";
import Header from "../../layout/header";

const Registry = ({ children }) => {
  const [isShownLog, setIsShownLog] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setIsShownLog((current) => !current);
  };

  return (
    // <Container>
    //   <Row>
    //     <Col s={12} className=" bg-warning">
    //       nav bar here
    //     </Col>
    //   </Row>
    //   <Row className="bg-warning mt-4" style={{ height: "80vh" }}>
    //     <Col className="bg-primary d-flex justify-content-center align-items-center">
    //       {isShownLog ? <Signin /> : <Signup />}
    //       <button onClick={(e) => handleClick(e)}></button>
    //     </Col>
    //   </Row>
    // </Container>

    <Container fluid>
      <Row className="bg-warning" style={{ height: "80vh" }}>
        <Col className="bg-dark-blue d-flex justify-content-center align-items-center flex-column main">
          {isShownLog ? <Signin /> : <Signup />}
          {isShownLog ? (
            <p className="caveat text-white">
              Don't have an account? Signup{" "}
              <a className="txt-blue" href="#" onClick={(e) => handleClick(e)}>
                here
              </a>
            </p>
          ) : (
            <p className="caveat text-white">
              Already a TwigElite? Login{" "}
              <a className="txt-blue" href="#" onClick={(e) => handleClick(e)}>
                here
              </a>
            </p>
          )}
          {/* <button className="p-3" onClick={e => handleClick(e)}></button> */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Registry;
