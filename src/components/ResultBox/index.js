import React from "react";
import { formatRelative } from "date-fns";

const ResultBox = ({ address, user, time }) => {
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
    </div>
  );
};

export default ResultBox;
