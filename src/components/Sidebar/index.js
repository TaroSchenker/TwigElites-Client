import React, { useContext, useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import axios from "axios";

const Sidebar = () => {
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
  ] = useContext(MapDataContext);

  /* ------ ------------------------------------------------------------------
  !handles the submit in column one ! 
  ----------------------------------------------------------------*/

  // setUserId(2); //? this is now being set manually, discuss tomorrow how to render this page after user has logged in to have access to userId in context
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("handling submit", twigletLocationToAdd);
    if (true) {
    }
    setMarkers((current) => [
      ...current,
      {
        address: twigletLocationToAdd.formatted_address,
        lat: twigletLocationToAdd.lat,
        lng: twigletLocationToAdd.lng,
        time: new Date(),
        placeId: e.placeId,
        user: 2, // need to see how to grab this, could work this out from server ideally
      },
    ]);

    //! I need for your data to match this fake data as this is the way we receive it on the server
    const fake_data = {
      longitude: 105,
      latitude: 893,
      shop_name: "fake shop2",
      address: "fake address2",
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      const { data } = await axios.post(
        "http://localhost:5000/twiglets",
        fake_data,
        { headers: headers }
      );

    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };
  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <Search setTwigletLocationToAdd={setTwigletLocationToAdd} />
        </Col>
      </Row>
      <Row>
        <Col s={12} md={3} className="mx-2 bg-success">
          {markers.map((i) => (
            <div> {i.placeId}</div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            {twigletLocationToAdd != "" ? (
              <Form.Group className="mb-3" style={{ width: "300px" }}>
                <Form.Label>Location Address</Form.Label>
                <Form.Control
                  value={twigletLocationToAdd.address_components[0].long_name}
                  placeholder="Use the above autocomplete"
                  disabled
                />
                <Form.Control
                  value={twigletLocationToAdd.address_components[1].long_name}
                  placeholder="Use the above autocomplete"
                  disabled
                />
                <Form.Control
                  value={twigletLocationToAdd.address_components[2].long_name}
                  placeholder="Use the above autocomplete"
                  disabled
                />
                <Form.Control
                  value={twigletLocationToAdd.address_components[3].long_name}
                  placeholder="Use the above autocomplete"
                  disabled
                />
                <Form.Control
                  value={twigletLocationToAdd.address_components[4].long_name}
                  placeholder="Use the above autocomplete"
                  disabled
                />
              </Form.Group>
            ) : (
              <p> </p>
            )}
            <div>
              {/* {twigletLocationToAdd != "" ? ( */}
              <Button type="submit">Submit</Button>
              {/* // ) : ( // <p></p> */}
              {/* // )} */}
            </div>
          </form>
        </Col>
        {/* {console.log("twigletLocationToAdd", twigletLocationToAdd)} */}
        {/* {twigletLocationToAdd.place_id}
        {twigletLocationToAdd.formatted_address}
        {twigletLocationToAdd.placeId} */}
        {/* {twigletLocationToAdd.lat}
        {twigletLocationToAdd.lng} */}
      </Row>
    </Container>
  );
};

export default Sidebar;

/* ------ ------------------------------------------------------------------
  !search bar function & handling
  ----------------------------------------------------------------*/

function Search({ setTwigletLocationToAdd }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.5072, lng: () => -0.1276 },
      radius: 100 * 100,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      // console.log('results', results[0].formatted_address)
      console.log("results", results[0].address_components);
      const { lat, lng } = await getLatLng(results[0]);
      setTwigletLocationToAdd({
        ...results[0],
        lat,
        lng,
      });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="sidebar-search">
      <div className="p-3 text-center border border-dark">
        <p className="my-1">Submit your twiglet location:</p>
        {console.log(".....ready???", ready)}
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
            style={{
              margin: 0,
              width: "100%",
              color: "#454545",
            }}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </div>
  );
}
