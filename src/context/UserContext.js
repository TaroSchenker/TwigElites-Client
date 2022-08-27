import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={[setToken, token, userId, setUserId]}>
      {children}
    </UserContext.Provider>
  );
}
