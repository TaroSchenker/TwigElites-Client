import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Button } from "react-bootstrap";
import { MapDataContext } from "../../MapDataContext";
import { Icon } from "@iconify/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import axios from "axios";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  position: "relative",
  height: "35em",
  width: "100%",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 51.5072,
  lng: -0.1276,
};

export default function App() {
  const [selectedId, setSelectedId] = useState(0)
  const [disable, setDisable] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // const [markers, setMarkers] = useState([]);
  // const [selected, setSelected] = useState(null);

  const addTwigletVote = async () => {
    console.log('twiggy patch in map', selectedId);
    const { data } = await axios.patch(
      `https://test-twiglets.herokuapp.com/twiglets/${selectedId}/`);
        console.log(data)
  
  };

  //funtion to remove the twiglet from the local array once it has been deleted from the database.
  const removeDeletedItem = (id) => {
    setAllTwiglets(current =>
      current.filter(twiglet => {
        return twiglet.twiglet_id !== id;
      }),
    );
  };

  const deleteTwiglet = async () => {
    console.log('looking to delete!', selectedId)
    const { data } = await axios.delete(
      `https://test-twiglets.herokuapp.com/twiglets/${selectedId}/`);
    
      removeDeletedItem(selectedId)
      console.log(data, 'all twigs', allTwiglets)
      
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
    setGotoTwiglet, mainState, setMainState
  ] = useContext(MapDataContext);

  // console.log("selected", selected);
  // console.log("markers", markers);

  // const onMapClick = useCallback((e) => {
  //   console.log("this is tmy target", e);
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //       placeId: e.placeId,
  //     },
  //   ]);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  useEffect(() => {
    setSelected(gotoTwiglet);
    console.log("i wanna pan to the twiglet!");
  }, [gotoTwiglet]);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // setMarkers((current) => [
  //     ...current,
  //     {
  //       address: twigletLocationToAdd.formatted_address,
  //       lat: twigletLocationToAdd.lat,
  //       lng: twigletLocationToAdd.lng,
  //       time: new Date(),
  //       placeId: twigletLocationToAdd.place_id,
  //       // user: 2, // need to see how to grab this, could work this out from server ideally

  //     },
  //   ]);

  return (
    <div className="map-container w-100">
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {!loading &&
          allTwiglets.map((marker) => (
            <Marker
              key={`${marker.longitude}-${marker.latitude}`}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={() => {
                console.log("marker value", marker);
                setSelectedId(marker.twiglet_id);
                panTo({
                  lat: marker.latitude,
                  lng: marker.longitude,
                });
                setSelected(marker); 
            
              }}
              icon={{
                url: `/twiglets-logo-png-transparent.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
             
          ))}
        }
        {selected ? (
         
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h5>
                {selected.shop_name}
              </h5>
              <p>
                {/* Found Originals! {formatRelative(selected.time, new Date())} */}
              </p>
              <p>Address: {selected.address}</p>
              <p>Upvote Count: {selectedId.votes}</p>
              <Button disabled={disable} onClick={addTwigletVote}>Up Vote</Button>
              <Button onClick={deleteTwiglet}>Remove Twiglets</Button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <Icon icon="carbon:location-current" height="40" />
    </button>
  );
}

// the search bar at the top of the map.
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.5072, lng: () => -0.1276 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      // console.log('results', results[0].formatted_address)
      // console.log("results", results[0]);
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
