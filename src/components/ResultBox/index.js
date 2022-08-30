import React, { useContext, useState} from "react";
import { formatRelative } from "date-fns";
import { Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import axios from "axios";

const ResultBox = ({ address, user, time, id, votes }) => {
  const addTwigletVote = async () => {
    const { data } = await axios.patch(
      `http://test-twiglets.herokuapp.com/twiglets/${id}/`
    );
    console.log('adding vote', data)


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
        <Button onClick={addTwigletVote} >Upvote</Button>
      </p>
    </div>
  );
};

export default ResultBox;
