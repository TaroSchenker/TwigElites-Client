import React, { useContext, useState, useEffect } from "react";
import { Container, Col, Row, Card, Form, Button, Modal } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";
import "../../App.css";

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

const Sidebar = ({ handleClose, setPlayGame }) => {
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
    mainState,
    setMainState,
    setGotoTwiglet,
  ] = useContext(MapDataContext);
  const [show, setShow] = useState(false);

  const handleClosing = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("twiglets-token");
  // console.log("TOKE", token);
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
      votes: 0
    };

    try {
      setSelected(fake_data);
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
    // <div className={"l-sidebar " + token != "undefined" ? "red" : "blurred"}>
    
    <div className="l-sidebar">
      <Container className="p-0 d-flex flex-column h-100 justify-content-between pb-3 red">
        <Row className="">
          <Col className="p-0">
            <Search
              setTwigletLocationToAdd={setTwigletLocationToAdd}
              initialLocation={initialLocation}
            />
          </Col>
        </Row>
        <Row className="h-100 d-flex flex-column">
          <Col className="p-0 d-flex justify-content-center">
            <form onSubmit={(e) => handleFormSubmit(e)}>
              {twigletLocationToAdd != "" ? (
                <Form.Group
                  className="mb-3 input-container"
                  style={{ width: "300px" }}
                >
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
          <div className="info-te d-flex justify-content-center  flex-column align-items-center">
            <p className="text-white text-center">This app helps Twiglet lovers find packets of Twilets with the original recipe!</p>
            <button className="draw" onClick={handleShow} style={{fontFamily:'caveat'}}><span className="medium">Info</span></button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <div className="bg-dark-blue mod text-white text-center">
              <Modal.Body>
                <h5>
                  Hello!
                </h5> 
                <p>
                  As you will know, our beloved Twiglet recipe has been ruined! This app will help us keep tabs which locations are still selling the original packets so we can all enjoy Twiglets while we can! 
                </p>
                <p>
                  If you find original twiglets in your local shop please sign up and add the location to the map so we can help teh community enjoy Twiglets!
                  </p>
             
                  <img src="/img/torigingame.png" alt="Original Twiglets" width="200" height="200" />
                       <p> Make sure you are looking this original packaging!</p>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center align-items-center">
                <button className="draw" onClick={handleClosing}>
                  <span>
                  Close
                  </span>
                </button>
              </Modal.Footer>
              </div>
            </Modal>
          </div>
          <div className="mt-5 d-flex justify-content-evenly controls">

            <button
              className="draw"
              onClick={() => {
                setPlayGame(current => false)
              }}
            >
              <span>
                <i className="fa-solid fa-globe"></i>
              </span>
            </button>
            <button
              className="draw"
              onClick={() => {
            setPlayGame(current => true)
              }}
            >
              <span>
                <i className="fa-solid fa-gamepad"></i>
              </span>
            </button>
            <button
              className="draw"
              onClick={() => {
          
              }}
            >
              <span>
                <i className="fa-solid fa-comment"></i>
              </span>
            </button>
          </div>

          {/* <button className="draw"
            onClick={() => {

  setPlayGame(current => false)
            }}
            data-toggle="tooltip" data-placement="top" title="View twiglocator"
          >
            <span data-toggle="tooltip" data-placement="top" title="View twiglocator"><i className="fa-solid fa-globe"></i></span>
          </button>
          <button className="draw"
            onClick={() => {

                setPlayGame(current => true)
            }}
            data-toggle="tooltip" data-placement="top" title="Play twigame"
          >
           <span data-toggle="tooltip" data-placement="top" title="Play twigame"><i className="fa-solid fa-gamepad"></i></span>
          </button>
          <button className="draw"
            onClick={() => {
   
              setMainState(3);
            }}
            data-toggle="tooltip" data-placement="top" title="Start twiglegram"
          >
           <span data-toggle="tooltip" data-placement="top" title="Start twiglegram"><i className="fa-solid fa-comment"></i></span>
          </button>
        </div> */}

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
  console.log("ready", ready, data);
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
