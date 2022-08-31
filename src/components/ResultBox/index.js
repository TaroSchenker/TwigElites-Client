import React, { useContext} from "react";
import { formatRelative } from "date-fns";
import { Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";

const ResultBox = ({ address, user, time }) => {
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
      </p>
      <div className="d-flex justify-content-around mt-1">
        <button className="box-btn m-1"><i class="fa-solid fa-location-crosshairs"></i></button>
        <button className="box-btn m-1"><i class="fa-solid fa-trash"></i></button>
        <button className="box-btn m-1"><i class="fa-solid fa-thumbs-up"></i></button>
      </div>
    </div>
  );
};

export default ResultBox;
