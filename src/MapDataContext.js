import React, { createContext, useState } from "react";

export const MapDataContext = createContext();

export default function MapDataProvider(props) {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [twigletLocationToAdd, setTwigletLocationToAdd] = useState([]);
  const [allTwiglets, setAllTwiglets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gotoTwiglet, setGotoTwiglet] = useState(null);
  const [initialLocation, setInitialLocation] = useState({ lat: 51.5072, lng: -0.1276 });
  const [playGame, setPlayGame] = useState(false);
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
        setAllTwiglets, loading, setLoading, gotoTwiglet, setGotoTwiglet, initialLocation, setInitialLocation, playGame, setPlayGame
      ]}
    >
      {props.children}
    </MapDataContext.Provider>
  );
}
