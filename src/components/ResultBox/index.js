import React, { useContext, useState } from "react";
import { formatRelative } from "date-fns";
import { Button, Modal } from "react-bootstrap";
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

  const [disable, setDisable] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [voteCount, setVoteCount] = useState(votes);


  const removeDeletedItem = (id) => {
    setAllTwiglets((current) =>
      current.filter((twiglet) => {
        return twiglet.twiglet_id !== id;
      })
    );
  };

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  let shortened = truncate(address, 15);

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
    setVoteCount(current => current += 1)
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
    <div className="box short">
      <p className="my-0 text-white time"> 
      {time} days ago
      </p>
      <p className="my-0 text-white votes">Votes: {voteCount}</p>
      {/* <p className="my-0 text-white below">Found By: {user}</p> */}
      <p className="my-0 text-white below">
        {/* <strong>Name:</strong> */}
        {name}
      </p>
      <p className="my-0 text-white below">
        {/* {address} */}
        {shortened}
      </p>
      {/* <p className="my-0"> <strong>Date found:</strong> {formatRelative(time, new Date())}</p> */}   
      
      <div className="d-flex justify-content-around my-1 buttons">
        <button onClick={() => setGotoTwiglet(twiglet)} className="draw m-1" data-toggle="tooltip" data-placement="top" title="Locate Twiglet"><span><i class="fa-solid fa-location-crosshairs"></i></span></button>
        <button onClick={deleteTwiglet} onClick={handleShow} className="draw m-1" data-toggle="tooltip" data-placement="top" title="Delete Twiglet Location"><span><i class="fa-solid fa-trash"></i></span></button>
        <button disabled={disable} onClick={addTwigletVote} className="draw m-1" data-toggle="tooltip" data-placement="top" title="Upvote tTiglet"><span><i class="fa-solid fa-thumbs-up"></i></span></button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div className="bg-dark-blue mod text-white text-center">
        <Modal.Body>
          Are you sure you want to delete this twiglet location?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <button onClick={() => {
            deleteTwiglet()
            handleClose()}} className="draw"><span>Confirm</span>
          </button>
          <button className="draw" onClick={handleClose}>
            <span>
            Close
            </span>
          </button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
    
  );
};

export default ResultBox;
