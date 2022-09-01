import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import MapDataProvider from "./MapDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <ContactsProvider>
      <ConversationsProvider>
        <MapDataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MapDataProvider>
      </ConversationsProvider>
    </ContactsProvider>
  </SocketProvider>
);
