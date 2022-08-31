import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map, RightSidebar, Sidebarnew } from "../../components";
import Sidebar from "../../components/Sidebar";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";
import Game from "../../components/Game/Main";


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
    setAllTwiglets, loading, setLoading, playGame
  ] = useContext(MapDataContext);

  // this fetch is fetching from a nasa API. it is just letft in as a  placeholder, can be ammended for our own requests.
  useEffect(() => {
 setLoading(false);
    const fetch_all_twiglets = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://test-twiglets.herokuapp.com/twiglets"
      );
      setAllTwiglets([...data]);
      setMarkers([...data]);
      setLoading(false);
      // return data;
    };
    fetch_all_twiglets();

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  
  }, []);

  console.log("These are the markers")
  console.log("These are the markers")
  console.log(markers);
  console.log("These are the markers")
  console.log("These are the markers")


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
            {/* <Sidebarnew sightings={sightings} menu={menu1}/> */}
            {!loading ? <Sidebar /> : <h1 className="loader"> loading</h1>}
            </Col>

            <Col lg={6} className="p-0 d-flex justify-content-center align-items-center">

              {!loading ? <Map /> : <h1 className="loader"> loading</h1>}
              {/* <Game /> */}
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
