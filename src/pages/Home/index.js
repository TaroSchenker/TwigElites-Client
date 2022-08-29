import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map, RightSidebar } from "../../components";
import Sidebar from "../../components/Sidebar";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";

const Home = () => {
  const [eventData, setEventData] = useState([]);

  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
    allTwiglets,
    setAllTwiglets, loading, setLoading
  ] = useContext(MapDataContext);

  // this fetch is fetching from a nasa API. it is just letft in as a  placeholder, can be ammended for our own requests.
  useEffect(() => {
    const fetchEvents = async () => {
      console.log("i fetch events");
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json();
      setEventData(events);
      // setLoading(false);
    };

    const fetch_all_twiglets = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://test-twiglets.herokuapp.com/twiglets"
      );
      setAllTwiglets([...data]);
      setMarkers([...data]);
      
    
      setLoading(false);
      // return data;
    };


    fetch_all_twiglets();
    fetchEvents();
  }, []);

 
  return (
    <Container fluid="lg">
      <Row className="mt-3" style={{ height: "90vh" }}>
        <Col s={12} className="bg-light">
          {!loading ? <Sidebar /> : <h1 className="loader"> loading</h1>}
        </Col>
        <Col s={12} md={6} className=" bg-transparent">
          {!loading ? <Map /> : <h1 className="loader"> loading</h1>}
        </Col>
        <Col s={12} className=" bg-light">
          {!loading ? <RightSidebar /> : <h1 className="loader"> loading</h1>}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
