import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../layout/Header"

const Home = () => {
  let sightings = [1, 2, 3, 4, 5];

  let menu1 = ["Top5", "oldest", "My Recent"]

  let menu2 = ["Top5", "Closest", "Verified", "Recent", "Oldest"]

  return (
    <Container fluid>
      <Row>
        <Col className="bg-warning p-0">
          <Header />
        </Col>
      </Row>
      <Row>
        <Col className="bg-dark-blue main p-0">
          <Row className="w-100 main m-0">
            <Col lg={3} className="d-flex justify-content-center align-items-center">
            <Sidebar sightings={sightings} menu={menu1}/>
            </Col>
            <Col lg={6} className="bg-info">
              Map
            </Col>
            <Col ls={3} className="d-flex justify-content-center align-items-center">
            <Sidebar sightings={sightings} menu={menu2}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
