import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map, RightSidebar } from "../../components";
import Sidebar from "../../components/Sidebar";
import { MapDataContext } from "../../MapDataContext";

const Home = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
  ] = useContext(MapDataContext);
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

  // setMarkers((current) => [
  //     ...current,
  //     {
  //       address: twigletLocationToAdd.formatted_address,
  //       lat: twigletLocationToAdd.lat,
  //       lng: twigletLocationToAdd.lng,
  //       time: new Date(),
  //       placeId: twigletLocationToAdd.place_id,
  //       // user: 2, // need to see how to grab this, could work this out from server ideally


  //     },
  //   ]);
    
  }, []);

  return (
    <Container fluid="lg">
      <Row className="mt-3" style={{ height: "90vh" }}>
        <Col s={12}  className="bg-light">
          {!loading ? <Sidebar /> : <h1 className="loader"> loading</h1>}
        </Col>
        <Col s={12} md={6} className=" bg-transparent">
          {!loading ? <Map /> : <h1 className="loader"> loading</h1>}
        </Col>
        <Col s={12}  className=" bg-light">
      
          {!loading ? <RightSidebar /> : <h1 className="loader"> loading</h1>}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
