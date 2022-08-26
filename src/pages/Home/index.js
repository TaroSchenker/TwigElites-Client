import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col s={12} className=" bg-warning">
        nav bar here
        </Col>
      </Row>
      <Row className="mt-4" style={{ height: "80vh" }}>
        <Col s={12} md={3} className="mx-2 bg-primary">
        <Sidebar />
        </Col>
        <Col s={12} md={5} className="mx-2 bg-info">
          Map
        </Col>
        <Col s={12} md={3} className="mx-2 bg-danger">
        <Sidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
