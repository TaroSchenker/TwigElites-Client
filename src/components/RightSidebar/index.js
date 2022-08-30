import React, { useContext, useEffect, useState } from "react";
import { MapDataContext } from "../../MapDataContext";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import ResultBox from "../ResultBox";
import axios from "axios";


const RightSidebar = ({menu}) => {
  // const [allTwiglets, setAllTwiglets] = useState([]);
  const [isMenu, setIsMenu] = useState(menu[0]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    setIsMenu(e.target.textContent)
  };


  // useEffect(() => {
  //   const fetch_all_twiglets = async () => {
  //     const { data } = await axios.get(
  //       "http://test-twiglets.herokuapp.com/twiglets"
  //     );
  //     setAllTwiglets([...data]);
  //     return data;
  //   };
  //   fetch_all_twiglets();
  // }, []);

  const [
    markers,
    setMarkers,
    selected,
    setSelected,
    twigletLocationToAdd,
    setTwigletLocationToAdd, allTwiglets, setAllTwiglets
  ] = useContext(MapDataContext);
  // console.log("right side bar", markers);


  // console.log("ALL twiglets", allTwiglets);
  return (

    <div className="sidebar">
      <ul className="list">
        <li className="base item"><a className="s-link link" href="#"><i class="fa-solid fa-circle-chevron-down px-3"></i> {isMenu}</a>
          <ul className="list">
            {menu.map((item) => <li className="sub item text-center"><a className="link" href="#" onClick={e => handleClick(e)}>{item}</a></li>)}
            {/* <li className="sub item"><a className="link" href="#">Top 5</a></li>
            <li className="sub item"><a className="link" href="#">Closest</a></li> */}
          </ul>
        </li>
      </ul>



      <div className="slider">
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
          <div key={twiglet.id}>
            <ResultBox
              key={twiglet.shop_id}
              address={twiglet.address}
              user={twiglet.found_by_user}
              time={twiglet.date_last_confirmed}  
              marker={twiglet}
              votes={twiglet.votes}   
              id={twiglet.id} 
            />
        

          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
