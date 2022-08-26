import React, {useState, useEffect} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map } from "../../components";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const fetchEvents = async () => {
        console.log('i fetch events')
          setLoading(true)
          const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
          const { events } = await res.json()
          setEventData(events)
          setLoading(false)    
      }
      fetchEvents()
      console.log(eventData) 
  
    },[])

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
        <Col s={12} md={5} className="mx-2 bg-transparent">
        {!loading  ? <Map eventData={eventData} /> : <h1 className='loader'> loading</h1>}
        </Col>
        <Col s={12} md={3} className="mx-2 bg-danger">
        <Sidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
