import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function LocationMarker({ positions, setPositions }) {
  //const [positions, setPositions] = useState([]);
  // console.log(positions);
  useMapEvents({
    dblclick(ev) {
      const { lat, lng } = ev.latlng;
      //   const newPositions = { lat, lng }; //[...positions]
      //   newPositions.push({ lat, lng });
      setPositions([lat, lng]); //
    },
  });

  return null;
}

export default LocationMarker;
