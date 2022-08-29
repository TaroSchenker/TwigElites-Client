import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MapDataProvider from "./MapDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MapDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MapDataProvider>
);
