import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Signup from "../../components/Signup"

const Registry = () => {
  return (
    <Container>
      <Row>
        <Col s={12} className=" bg-warning">
        nav bar here
        </Col>
      </Row>
      <Row className="bg-warning mt-4" style={{ height: "80vh" }}>
        <Col className="bg-primary d-flex justify-content-center align-items-center">
            <Signup />
        </Col>
      </Row>
    </Container>
  );
};

export default Registry;