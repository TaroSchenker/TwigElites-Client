import React, { useContext } from "react";
import { MapDataContext } from "../../MapDataContext";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import ResultBox from "../ResultBox";

const RightSidebar = () => {
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
  ] = useContext(MapDataContext);
  console.log("right side bar", markers);
  return (
    <Container>
      {markers.map((marker) => (
        <Row
            className="border border-dark my-1"
            key={marker.placeId}>
      
          <ResultBox key={marker.placeId} address={marker.address} user={marker.user} time={marker.time}/>
        </Row>
      ))}
    </Container>
  );
};

export default RightSidebar;
