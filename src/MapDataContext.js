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
  const [mainState, setMainState] = useState('map');
  const [voteCount, setVoteCount] = useState(null);
  const [tokenContext, setTokenContext] = useState(null);
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
        setAllTwiglets, loading, setLoading, gotoTwiglet, setGotoTwiglet, initialLocation, setInitialLocation, mainState, setMainState, voteCount, setVoteCount, tokenContext, setTokenContext
      ]}
    >
      {props.children}
    </MapDataContext.Provider>
  );
}
