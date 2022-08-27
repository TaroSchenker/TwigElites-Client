import React from 'react'
import { formatRelative } from "date-fns";

const ResultBox = ({ address, user, time}) => {
  return (
    <>
    <p className="my-0"><strong>Location:</strong>{address}</p>
    <p className="my-0"><strong>Found by:</strong> {user} </p>
    <p className="my-0"> <strong>Date found:</strong> {formatRelative(time, new Date())}</p>

    </>
  
  )
}

export default ResultBox
