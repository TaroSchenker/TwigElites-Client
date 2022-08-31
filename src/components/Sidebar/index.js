import React, { useContext, useState, useEffect } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";

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

const Sidebar = ({handleClose}) => {
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
    allTwiglets,
    setAllTwiglets,
  ] = useContext(MapDataContext);

  /* ------ ------------------------------------------------------------------
  !handles the submit in column one ! 
  ----------------------------------------------------------------*/

  // setUserId(2); //! this is now being set manually, discuss tomorrow how to render this page after user has logged in to have access to userId in context

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("handling submit", twigletLocationToAdd);
    if (true) {
    }
    console.log("current value of markers before submit is", markers);
    setAllTwiglets((current) => [
      ...current,
      {
        address: twigletLocationToAdd.formatted_address,
        latitude: twigletLocationToAdd.lat,
        longitude: twigletLocationToAdd.lng,
        // time: new Date(),
        shop_id: twigletLocationToAdd.place_id,
        shop_name: "twigletLocationToAdd.place_id",
      },
    ]);

    //! I need for your data to match this fake data as this is the way we receive it on the server
    const fake_data = {
       latitude :twigletLocationToAdd.lat,
      longitude: twigletLocationToAdd.lng,
      shop_name: "twigletLocationToAdd.place_id",
      shop_id: twigletLocationToAdd.place_id,
      address: twigletLocationToAdd.formatted_address,
    };

    try {
      // console.log("fake_data", fake_data);
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      // };

      const { data } = await axios.post(
        "https://test-twiglets.herokuapp.com/twiglets",
        fake_data
        // { headers: headers }
      );
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };

  return (
    <div className="l-sidebar">
      <Container className="p-0">
        <Row>
          <Col className="p-0">
            <Search setTwigletLocationToAdd={setTwigletLocationToAdd} />
          </Col>
        </Row>
        <Row>
          <Col className="p-0 d-flex justify-content-center">
            <form onSubmit={(e) => handleFormSubmit(e)}>
              {twigletLocationToAdd != "" ? (
                <Form.Group className="mb-3" style={{ width: "300px" }}>
                  <Form.Label className="text-white caveat w-100 text-center">Location Address:</Form.Label>
                  <Form.Control className="caveat rounded-0 text-center text-white border-0"
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    value={twigletLocationToAdd.address_components[0].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control className="caveat rounded-0 text-center text-white border-0"
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    value={twigletLocationToAdd.address_components[1].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control className="caveat rounded-0 text-center text-white border-0"
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    value={twigletLocationToAdd.address_components[2].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control className="caveat rounded-0 text-center text-white border-0"
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    value={twigletLocationToAdd.address_components[3].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control className="caveat rounded-0 text-center text-white border-0"
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    value={twigletLocationToAdd.address_components[4].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                </Form.Group>
              ) : (
                <p> </p>
              )}
              <div className="d-flex justify-content-center">
                {/* {twigletLocationToAdd != "" ? ( */}
                <button className="special-btn caveat" type="submit" onClick={handleClose}>Submit</button>
                {/* // ) : ( // <p></p> */}
                {/* // )} */}

              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
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
      console.log("results", results[0]);
      const { lat, lng } = await getLatLng(results[0]);
      setTwigletLocationToAdd({
        ...results[0],
        lat,
        lng,
      });
      // setTwigletLocationToAdd({
      //   ...results[0],
      //   lat,
      //   lng,
      // });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="sidebar-search">

      <div className="p-3 text-center text-white">
        {/* {console.log(".....ready???", ready)} */}
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Submit twiglet location"
            type="text"
            style={{
              margin: 0,
              padding: "0 5px",
              width: "100%",
              color: "#ffffff",
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
