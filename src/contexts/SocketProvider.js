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
    JSON.parse(localStorage.getItem("twiglets-id"));

  useEffect(() => {
    const SOCKET_URI = "ws://test-twiglets.herokuapp.com/";
    const newSocket = io(SOCKET_URI, { query: { id } });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
