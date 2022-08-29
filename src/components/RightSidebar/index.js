import React, { useContext, useEffect, useState } from "react";
import { MapDataContext } from "../../MapDataContext";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import ResultBox from "../ResultBox";
import axios from "axios";

const RightSidebar = () => {
  const [allTwiglets, setAllTwiglets] = useState([]);

  useEffect(() => {
    const fetch_all_twiglets = async () => {
      const { data } = await axios.get(
        "http://test-twiglets.herokuapp.com/twiglets"
      );
      setAllTwiglets([...data]);
      return data;
    };
    fetch_all_twiglets();
  }, []);

  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
  ] = useContext(MapDataContext);
  console.log("right side bar", markers);


  console.log("ALL twiglets", allTwiglets);
  return (
    <Container>
      {/* {markers.map((marker) => (
        <Row className="border border-dark my-1" key={marker.placeId}>
          <ResultBox
            key={marker.placeId}
            address={marker.address}
            user={marker.user}
            time={marker.time}
          />
        </Row>
      ))} */}
      {allTwiglets.map((twiglet) => (
        <Row className="border border-dark my-1" key={twiglet.id}>
          <ResultBox
            key={twiglet.shop_id}
            address={twiglet.address}
            user={twiglet.found_by_user}
            time={twiglet.date_last_confirmed}
          />

        </Row>
      ))}
    </Container>
  );
};

export default RightSidebar;
