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

const Sidebar = ({ handleClose }) => {
  const getShopName = (name) => {
    return name.split(",")[0];
  };
  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd,
    allTwiglets,
    setAllTwiglets,
    initialLocation,
    setInitialLocation,
    mainState, setMainState, setGotoTwiglet
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
    // console.log("current value of markers before submit is", markers);
    setAllTwiglets((current) => [
      ...current,
      {
        address: twigletLocationToAdd.formatted_address,
        latitude: twigletLocationToAdd.lat,
        longitude: twigletLocationToAdd.lng,
        // time: new Date(),
        shop_id: twigletLocationToAdd.place_id,
        shop_name: getShopName(twigletLocationToAdd.address),
      },
    ]);

    //! I need for your data to match this fake data as this is the way we receive it on the server
    const fake_data = {
      latitude: twigletLocationToAdd.lat,
      longitude: twigletLocationToAdd.lng,
      shop_name: getShopName(twigletLocationToAdd.address),
      shop_id: twigletLocationToAdd.place_id,
      address: twigletLocationToAdd.formatted_address,
    };

    try {
        setSelected(fake_data)
      // console.log("fake_data", fake_data);
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      // };

      const { data } = await axios.post(
        "http://test-twiglets.herokuapp.com/twiglets",
        fake_data
        // { headers: headers }
      );
    

    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };
  return (
    <div className="l-sidebar">
      <Container className="p-0 d-flex flex-column h-100 justify-content-between pb-3">
        <Row className="">
          <Col className="p-0">
            <Search setTwigletLocationToAdd={setTwigletLocationToAdd} initialLocation={initialLocation} />
          </Col>
        </Row>
        <Row className="h-100 d-flex flex-column">
          <Col className="p-0 d-flex justify-content-center">
            <form onSubmit={(e) => handleFormSubmit(e)}>
                {twigletLocationToAdd != "" ? (
                <Form.Group className="mb-3 input-container" style={{ width: "300px" }}>
                  <Form.Label className="text-white  w-100 text-center input-address">
                   <strong> Location Address:</strong>
                  </Form.Label>
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    value={getShopName(twigletLocationToAdd.address)}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    value={twigletLocationToAdd.address_components[0].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    value={twigletLocationToAdd.address_components[1].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    value={twigletLocationToAdd.address_components[2].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    value={twigletLocationToAdd.address_components[3].long_name}
                    placeholder="Use the above autocomplete"
                    disabled
                  />
                  <Form.Control
                    className=" rounded-0 text-center text-white border-0 input-address"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
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
                <button
                  className="special-btn caveat"
                  type="submit"
                  onClick={handleClose}
                >
                  Submit
                </button>
                {/* // ) : ( // <p></p> */}
                {/* // )} */}
              </div>
            </form>
          </Col>
          <div className="mt-5 d-flex justify-content-evenly controls">
          <button className="draw"
            onClick={() => {

              setMainState(1);
            }}
          >
            <span><i className="fa-solid fa-globe"></i></span>
          </button>
          <button className="draw"
            onClick={() => {

              setMainState(2);
            }}
          >
           <span><i className="fa-solid fa-gamepad"></i></span>
          </button>
          <button className="draw"
            onClick={() => {
   
              setMainState(3);
            }}
          >
           <span><i className="fa-solid fa-comment"></i></span>
          </button>
        </div>
        </Row>
      </Container>
    </div>

    // COMMMENT OUT THE BELOW CODE
    // ***********
    // <Container>
    //   <Row>
    //     <Col className="mt-3">
    //       <Search setTwigletLocationToAdd={setTwigletLocationToAdd} initialLocation={initialLocation} />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col className="mt-3">
    //       <form onSubmit={(e) => handleFormSubmit(e)}>
    //         {twigletLocationToAdd != "" ? (
    //           <Form.Group className="mb-3" style={{ width: "300px" }}>
    //             <Form.Label>Location Address</Form.Label>
    //             <Form.Control
    //               value={twigletLocationToAdd.address}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //             <Form.Control
    //               value={twigletLocationToAdd.address_components[0].long_name}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //             <Form.Control
    //               value={twigletLocationToAdd.address_components[1].long_name}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //             <Form.Control
    //               value={twigletLocationToAdd.address_components[2].long_name}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //             <Form.Control
    //               value={twigletLocationToAdd.address_components[3].long_name}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //             <Form.Control
    //               value={twigletLocationToAdd.address_components[4].long_name}
    //               placeholder="Use the above autocomplete"
    //               disabled
    //             />
    //           </Form.Group>
    //         ) : (
    //           <p> </p>
    //         )}
    //         <div>

    //           {/* {twigletLocationToAdd != "" ? ( */}
    //           <Button type="submit" onClick={handleClose}>Submit</Button>
    //           {/* // ) : ( // <p></p> */}
    //           {/* // )} */}

    //         </div>
    //       </form>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Button onClick={()=>{
          
    //     }}>
    //       play a game!
    //     </Button>
    //   </Row>
    // </Container>
    // ***********
    //     COMMMENT OUT THE ABOVE CODE
  );
};

export default Sidebar;

/* ------ ------------------------------------------------------------------
  !search bar function & handling
  ----------------------------------------------------------------*/

function Search({ setTwigletLocationToAdd, initialLocation }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => initialLocation.lat,
        lng: () => initialLocation.lng,
      },
      radius: 100 * 100,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };
    console.log('ready', ready, data)
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    
    try {
    
      const results = await getGeocode({ address });
      // const place_info =  await getGeocode({ description });
      // console.log('results', results[0].formatted_address)
      // console.log('placeinfo', place_info)
      // console.log("results", results[0]);
      const { lat, lng } = await getLatLng(results[0]);
      setTwigletLocationToAdd({
        ...results[0],
        address,
        lat,
        lng,
      });
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
