import React, { useContext, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const id =
    localStorage.getItem("twiglets-id") != "undefined" &&
    localStorage.getItem("twiglets-id") != "null" &&
    JSON.parse(localStorage.getItem("twiglets-id"));

  console.log("IDDDDD", localStorage.getItem("twiglets-id"));
  useEffect(() => {
    try {
      const SOCKET_URI = "ws://localhost:5000/";
      // const SOCKET_URI = "http://test-twiglets.herokuapp.com";

      const newSocket = io(
        SOCKET_URI,
        { query: { id } },
        { path: "/path/to/socket.io" }
      );

      setSocket(newSocket);
      return () => newSocket.close();
    } catch (error) {
      console.log("There's been an error " + error);
    }
  }, [localStorage.getItem("twiglets-id")]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
