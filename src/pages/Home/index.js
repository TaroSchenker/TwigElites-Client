import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map, RightSidebar, Sidebarnew } from "../../components";
import Sidebar from "../../components/Sidebar";


const Home = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  // this fetch is fetching from a nasa API. it is just letft in as a  placeholder, can be ammended for our own requests.
  useEffect(() => {
    const fetchEvents = async () => {
      console.log("i fetch events");
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json();
      setEventData(events);
      setLoading(false);
    };
    fetchEvents();
    // console.log(eventData)
  }, []);

  let sightings = [1, 2, 3, 4, 5];

  let menu1 = ["Top5", "Closest", "Verified"]

  let menu2 = ["Top5", "Closest", "Verified", "Recent", "Oldest"]

  return (
    // <Container fluid="lg">
    //   <Row className="mt-3" style={{ height: "90vh" }}>
    //     <Col s={12}  className="bg-light">
    //       {!loading ? <Sidebar /> : <h1 className="loader"> loading</h1>}
    //     </Col>
    //     <Col s={12} md={6} className=" bg-transparent">
    //       {!loading ? <Map /> : <h1 className="loader"> loading</h1>}
    //     </Col>
    //     <Col s={12}  className=" bg-light">
      
    //       {!loading ? <RightSidebar /> : <h1 className="loader"> loading</h1>}
    //     </Col>
    //   </Row>
    // </Container>

    <Container fluid>
      <Row>
        <Col className="bg-dark-blue main p-0">
          <Row className="w-100 main m-0">
            <Col lg={3} className="d-flex justify-content-center align-items-center">
            <Sidebarnew sightings={sightings} menu={menu1}/>
            {/* {!loading ? <Sidebar /> : <h1 className="loader"> loading</h1>} */}
            </Col>
            <Col lg={6} className="pt-5 p-0">
              {!loading ? <Map /> : <h1 className="loader"> loading</h1>}
            </Col>
            <Col lg={3} className="d-flex justify-content-center align-items-center">
            {/* <Sidebarnew sightings={sightings} menu={menu2}/> */}
            {!loading ? <RightSidebar menu={menu2}/> : <h1 className="loader"> loading</h1>}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
