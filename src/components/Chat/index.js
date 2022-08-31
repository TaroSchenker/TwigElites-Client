import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";

const Chat = () => {
  const token = localStorage.getItem("twiglets-token");
  const id = localStorage.getItem("twiglets-id");
  return (
    <>
      {id !== "undefined" && token !== "undefined" ? (
        <Dashboard />
      ) : (
        <p className='white-text'>
          Register to get access to this page!
        </p>
      )}
    </>
  );
};

export default Chat;
