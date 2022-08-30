import React, { useContext, useState} from "react";
import { formatRelative } from "date-fns";
import { Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";

const ResultBox = ({ address, user, time, twiglet_id, votes, twiglet }) => {
  const [disable, setDisable] = React.useState(false);
  const removeDeletedItem = (id) => {
    setAllTwiglets(current =>
      current.filter(twiglet => {
        return twiglet.twiglet_id !== id;
      }),
    );
  };
  const addTwigletVote = async () => {
    const { data } = await axios.patch(
      `http://test-twiglets.herokuapp.com/twiglets/${twiglet_id}/`);
      setDisable(true)
      console.log(data)
  };

  const deleteTwiglet = async () => {
    const { data } = await axios.delete(
      `http://test-twiglets.herokuapp.com/twiglets/${twiglet_id}/`);
      console.log(data)
      removeDeletedItem(twiglet_id)
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
    setLoading,gotoTwiglet, setGotoTwiglet
  ] = useContext(MapDataContext);
  return (
    <div className="box">
      <p className="my-0 text-white">
        <strong>Location:</strong>
        {address}
      </p>
      <p className="my-0 text-white">
        <strong>Found by:</strong> {user}{" "}
      </p>
      {/* <p className="my-0"> <strong>Date found:</strong> {formatRelative(time, new Date())}</p> */}
      <p className="my-0 text-white">
        {" "}
        <strong>Date found:</strong> {time}
        <p>Votes: {votes}</p>
        <Button  disabled={disable} onClick={addTwigletVote} >Up Vote</Button>
        <Button onClick={deleteTwiglet} >Delete</Button>
        <Button onClick={() => setGotoTwiglet(twiglet)} >Goto</Button>
        
        
      </p>
    </div>
  );
};

export default ResultBox;
