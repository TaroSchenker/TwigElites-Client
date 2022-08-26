import React, {useState} from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../LocationMarker";
import Locationinfobox from "../LocationInfo";

;

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)
    const markers = eventData.map(e => {
        if(e.categories[0].id === 8){
            return  <LocationMarker lat={e.geometries[0].coordinates[1]} lng={e.geometries[0].coordinates[0]} onClick={() => setLocationInfo({id: e.id, title: e.title})}/>
        }
        return null
    })

  return ( 
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCd4UUo7DDCuMoSgBQ_PFgcH0OOFxcCdT4" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <Locationinfobox info={locationInfo} /> }
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
