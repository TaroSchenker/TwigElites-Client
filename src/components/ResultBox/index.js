import React from 'react'

const ResultBox = ({ address, user, time}) => {
  return (
    <>
    <p>Location:{address}</p>
    <p>Found By: {user} </p>

    </>
  
  )
}

export default ResultBox
