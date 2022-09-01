import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Map, RightSidebar, Sidebarnew } from "../../components";
import Sidebar from "../../components/Sidebar";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";
import Game from "../../components/Game/Main";

const mainDisplay = ["map", "game", "chat"];

const Home = () => {
  const [eventData, setEventData] = useState([]);
  const token = localStorage.getItem("twiglets-token");
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
    allTwiglets,
    setAllTwiglets,
    loading,
    setLoading,
    mainState,
    setMainState,
    initialLocation,
    setInitialLocation,
  ] = useContext(MapDataContext);

  // this fetch is fetching from a nasa API. it is just letft in as a  placeholder, can be ammended for our own requests.
  // const renderTwiglets = async () => {
  //   setLoading(true);
  //   const { data } = await axios.get(
  //     "https://test-twiglets.herokuapp.com/twiglets"
  //   );
  //   setAllTwiglets([...data]);
  //   setMarkers([...data]);
  //   setLoading(false);
  //   // return data;
  // };
  // const get_all_twiglets = async () => {
  //   setLoading(true);
  //   const { data } = await axios.get(
  //     "https://test-twiglets.herokuapp.com/twiglets"
  //   );
  //   setAllTwiglets([...data]);
  //   setMarkers([...data]);
  //   setLoading(false);
  //   // return data;
  // };
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
      setInitialLocation({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  }, []);

  console.log("These are the markers");
  console.log("These are the markers");
  console.log(markers);
  console.log("These are the markers");
  console.log("These are the markers");

  let sightings = [1, 2, 3, 4, 5];

  let menu1 = ["Top5", "Closest", "Verified"];

  let menu2 = ["Top5", "Closest", "Verified", "Recent", "Oldest"];

  const MainDisplay = () => {
    console.log("mainstate", mainState);
    if (mainState === 1) {
      setLoading(true);
      return !loading ? <Map /> : <h1 className="loader"> loading</h1>;
    } else if (mainState === 2) {
      return <Game />;
    } else if (mainState === 3) {
      return "seak therapy with twiglet chat";
    } else {
    }
  };

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
            <Col
              lg={3}
              md={3}
              sm={12}
              className="d-flex justify-content-center align-items-center"
            >
              {/* <Sidebarnew sightings={sightings} menu={menu1}/> */}
              {token != null && token != undefined && token ? (
                <Sidebar />
              ) : (
                <h1 className="loader"> loading</h1>
              )}
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="p-0 d-flex justify-content-center align-items-center"
            >
              {/* <MainDisplay /> */}
              {!loading ? <Map /> : <h1 className="loader"> loading</h1>}

              {/* {!loading ? <Map /> : <h1 className="loader"> loading</h1>}  */}
              {/* <Game /> */}
            </Col>

            <Col
              lg={3}
              className=" d-flex justify-content-center align-items-center"
            >
              {/* <Sidebarnew sightings={sightings} menu={menu2}/> */}
              {!loading ? (
                <RightSidebar menu={menu2} />
              ) : (
                <h1 className="loader"> loading</h1>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
