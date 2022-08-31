import React, { useContext, useState } from "react";
import { formatRelative } from "date-fns";
import { Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";

const ResultBox = ({
  formattedAddress,
  name,
  address,
  user,
  time,
  twiglet_id,
  votes,
  twiglet,
}) => {
  console.log('result box',twiglet)
  const [disable, setDisable] = useState(false);

  const removeDeletedItem = (id) => {
    setAllTwiglets((current) =>
      current.filter((twiglet) => {
        return twiglet.twiglet_id !== id;
      })
    );
  };

  // const updateVoteCountLocal = (id) => {
  //   allTwiglets((current) =>
  //   current.map((twiglet) => {
  //      if(twiglet.twiglet_id === id){
  //       twiglet.votes++
  //      };
  //   })
  // );
  // }

  const addTwigletVote = async () => {
    const { data } = await axios.patch(
      `https://test-twiglets.herokuapp.com/twiglets/${twiglet_id}/`
    );
    setDisable(true);
    // updateVoteCountLocal(twiglet_id)
    console.log(data);
  };

  const deleteTwiglet = async () => {
    const { data } = await axios.delete(
      `https://test-twiglets.herokuapp.com/twiglets/${twiglet_id}/`
    );
    console.log(data);
    removeDeletedItem(twiglet_id);
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
    loading,
    setLoading,
    gotoTwiglet,
    setGotoTwiglet,
  ] = useContext(MapDataContext);
  return (
    <div className="box">
      <p className="my-0 text-white time"> 
      Short date
      {/* <strong>Date found:</strong> {time}  */}
      </p>
      <p className="my-0 text-white votes">Votes: {votes}</p>
      <p className="my-0 text-white below">{user}</p>
      <p className="my-0 text-white below">
        {/* <strong>Name:</strong> */}
        {name}
      </p>
      <p className="my-0 text-white below">
        {address}
      </p>
      {/* <p className="my-0"> <strong>Date found:</strong> {formatRelative(time, new Date())}</p> */}   
      
      <div className="d-flex justify-content-around mt-1 buttons">
        <button onClick={() => setGotoTwiglet(twiglet)} className="box-btn m-1"><i class="fa-solid fa-location-crosshairs"></i></button>
        <button onClick={deleteTwiglet} className="box-btn m-1"><i class="fa-solid fa-trash"></i></button>
        <button disabled={disable} onClick={addTwigletVote} className="box-btn m-1"><i class="fa-solid fa-thumbs-up"></i></button>
      </div>
    </div>
    
  );
};

export default ResultBox;
