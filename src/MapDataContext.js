import React, { createContext, useState } from "react";

export const MapDataContext = createContext();

export default function MapDataProvider(props) {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [twigletLocationToAdd, setTwigletLocationToAdd] = useState([]);
  const [allTwiglets, setAllTwiglets] = useState([]);
  return (
    <MapDataContext.Provider
      value={[
        markers,
        setMarkers,
        selected,
        setSelected,
        twigletLocationToAdd,
        setTwigletLocationToAdd,
        allTwiglets, 
        setAllTwiglets
      ]}
    >
      {props.children}
    </MapDataContext.Provider>
  );
}
