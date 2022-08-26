import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Signup from "../../components/Signup";
import Signin from "../../components/Signin";
import { useState } from "react";

const Registry = () => {
  const [isShownLog, setIsShownLog] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setIsShownLog((current) => !current);
  };

  return (
    <Container>
      <Row>
        <Col s={12} className=" bg-warning">
          nav bar here
        </Col>
      </Row>
      <Row className="bg-warning mt-4" style={{ height: "80vh" }}>
        <Col className="bg-primary d-flex justify-content-center align-items-center">
          {isShownLog ? <Signin /> : <Signup />}
          <button onClick={(e) => handleClick(e)}></button>
        </Col>
      </Row>
    </Container>
  );
};

export default Registry;
