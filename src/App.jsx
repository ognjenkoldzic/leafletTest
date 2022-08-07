import {
  MapContainer,
  TileLayer,
  LayersControl,
  useMap,
  LayerGroup,
} from "react-leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet"; //
import { useState, useEffect, useRef } from "react";
import * as venues from "../mockupData.json";
import "./App.css";
import { Icon } from "leaflet";
import architectureMarker from "./assets/icons8-greek-pillar-50.png";
import paintingMarker from "./assets/external-painting-museum-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png";
import axios from "axios";
import { format } from "timeago.js";
import LocationMarker from "./LocationMarker";
import Closer from "./Closer";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Locator from "./Locator";
import AddNewPinForm from "./AddNewPinForm";
import PinCard from "./PinCard";
import { geosearch } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import Control from "react-leaflet-custom-control";
import MyLocationFinder from "./MyLocationFinder";

function App() {
  const [pins, setPins] = useState([]);
  const [positions, setPositions] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [locationButton, setLocationButton] = useState(false);
  const mapRef = useRef();

  // "https://young-fortress-38538.herokuapp.com/api/pins"
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:8001/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  console.log(pins);
  // useEffect(() => {
  //   console.log("Hallo");
  //   if (mapRef.current) {
  //     const map = mapRef.current;
  //     map
  //       .locate({
  //         setView: true,
  //         watch: true,
  //       }) /* This will return map so you can do chaining */
  //       .on("locationfound", function (e) {
  //         var marker = L.marker([e.latitude, e.longitude]).bindPopup(
  //           "Your are here :)"
  //         );
  //         var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
  //           weight: 1,
  //           color: "blue",
  //           fillColor: "#cacaca",
  //           fillOpacity: 0.2,
  //         });
  //         map.addLayer(marker);
  //         map.addLayer(circle);
  //       })
  //       .on("locationerror", function (e) {
  //         console.log(e);
  //         alert("Location access denied.");
  //       });
  //   }
  // }, [mapRef]);

  const coolMarkerArc = new L.Icon({
    iconUrl: architectureMarker,
    iconSize: [25, 25],
    popupAnchor: [0, -50], //not working
  });
  const coolMarkerPaint = new L.Icon({
    iconUrl: paintingMarker,
    iconSize: [25, 25],
  });

  const satLayerwithNames = new L.TileLayer({});

  delete L.Icon.Default.prototype._getIconUrl;
  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
  //   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  // });

  const { BaseLayer } = LayersControl;
  //console.log(TileLayer);
  // const centerLatLng = () => {
  //   if (positions) {
  //     return [positions[0], positions[1]];
  //   } else {
  //     [52.5170365, 13.37691];
  //   }
  // };
  let centerLatLng = [52.5170365, 13.37691];
  if (positions) {
    centerLatLng = [positions[0], positions[1]];
  } //this is maybe only centering at the beginning...other method neede???

  //console.log(positions);
  //console.log(centerLatLng);

  //console.log(pins);
  //ref={mapRef}
  // const circleBlue = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
  //   weight: 1,
  //   color: "blue",
  //   fillColor: "#cacaca",
  //   fillOpacity: 0.2,
  // });

  // useEffect(() => {
  //   //function locator3() {
  //   if (!map) return;
  //   map
  //     .locate({
  //       setView: true,
  //       watch: true,
  //     }) /* This will return map so you can do chaining */
  //     .on("locationfound", function (e) {
  //       // var marker = L.marker([e.latitude, e.longitude]).bindPopup(
  //       //   "Your are here :)"
  //       // );
  //       const circleBlue = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
  //         weight: 1,
  //         color: "blue",
  //         fillColor: "#cacaca",
  //         fillOpacity: 0.2,
  //       });
  //       //map.addLayer(marker);
  //       map.addLayer(circleBlue);

  //       //setLocationButton(false);
  //     });
  //   map.stop();
  //   setLocationButton(false);

  // map &&
  //   setTimeout(() => {
  //     map.off("locationfound");
  //     setLocationButton(false);
  //   }, 2000);
  //}
  // map && locator3();
  // }, [locationButton === true]);
  console.log(locationButton);

  // // .on("locationerror", function (e) {
  //   console.log(e);
  //   alert("Location access denied.");
  // });
  //}
  // ,
  // locationfound: (location) => {
  //   console.log("location found:", location);
  // },
  //   });
  // }

  return (
    <div>
      <MapContainer
        center={centerLatLng} //[52.5170365, 13.37691] centerLatLng
        zoom={13}
        scrollWheelZoom={false}
        ref={setMap}
        //whenCreated={setMap}
      >
        <LayersControl>
          <BaseLayer name={"OpenStreetMap"} checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name={"Satelite"}>
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
          <LayersControl.Overlay name="Marker with popup">
            <LayerGroup>
              <BaseLayer name={"SateliteName"}>
                <TileLayer
                  attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                  subdomains="abcd"
                  maxZoom={20}
                  opacity={0.5}
                />
              </BaseLayer>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {pins &&
          pins.map((pin) => (
            <Marker
              key={pin._id}
              position={[pin.lat, pin.long]}
              eventHandlers={{
                click: (e) => {
                  setCurrentPlace(pin);
                  setPositions(null);
                },
              }}
              icon={
                pin.type === "architecture" ? coolMarkerArc : coolMarkerPaint
              }
            />
          ))}
        {currentPlace && (
          <Popup position={[currentPlace.lat, currentPlace.long]}>
            <PinCard currentPlace={currentPlace} />
          </Popup>
        )}
        {positions && (
          <Popup
            position={[positions[0], positions[1]]}
            eventHandlers={{ click: (e) => console.log("Hy") }}
          >
            <AddNewPinForm
              onSetPins={setPins}
              onSetPositions={setPositions}
              positions={positions}
              pins={pins}
            />
          </Popup>
        )}
        <Control position="topleft">
          <button
            onClick={() => {
              setLocationButton(true);
              setPosition(null);
            }}
          >
            HALLO
          </button>
        </Control>
        <LocationMarker positions={positions} setPositions={setPositions} />
        <Closer
          setPositions={setPositions}
          setCurrentPlace={setCurrentPlace}
          map={map}
        />
        {/* <Locator /> */}
        {locationButton === true && (
          <MyLocationFinder
            onSetLocationButton={setLocationButton}
            position={position}
            onSetPosition={setPosition}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
