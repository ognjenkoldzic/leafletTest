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

function App() {
  const [activeVenue, setActiveVenue] = useState(null);
  const [pins, setPins] = useState([]);
  //const [newPlace, setNewPlace] = useState(null);
  const [positions, setPositions] = useState(null);
  // const [name, setName] = useState(null);
  // const [type, setType] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [public_access, setPublic_access] = useState(true);
  // const [indoor, setIndoor] = useState(false);
  // const [address, setAddress] = useState(null);
  // const [city, setCity] = useState(null);
  // const [rating, setRating] = useState(0);
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const descriptionRef = useRef(null);
  const public_accessRef = useRef(null);
  const indoorRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const ratingRef = useRef(0);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);

  //"fa-map-marker"
  // useEffect(() => {
  //   if (!map) return;

  //   L.easyButton("fa-map-marker",() => {
  //     map.locate().on("locationfound", function (e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     });
  //   }).addTo(map);
  // }, [map]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:8000/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const mapRef = useRef();

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

  const handleSubmit = async (e) => {
    //async
    e.preventDefault();
    const newPin = {
      // username: currentUsername,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      type: typeRef.current.value,
      rating: ratingRef.current.value, //star
      address: addressRef.current.value,
      // public_access,
      // indoor,
      city: cityRef.current.value,
      lat: positions[0],
      long: positions[1],
    };
    try {
      const res = await axios.post("http://localhost:8000/api/pins", newPin);
      setPins([...pins, res.data]); //
      setPositions(null);
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(pins);

  //console.log(currentPlaceId);
  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate({
          setView: true,
          watch: true,
        });
      },
      locationfound: (location) => {
        console.log("location found:", location);
      },
    });
    return null;
  }
  function Button() {
    return <button>HEY</button>;
  }
  return (
    <div>
      <Button />
      <MapContainer
        center={centerLatLng} //[52.5170365, 13.37691] centerLatLng
        zoom={13}
        scrollWheelZoom={false}
        ref={mapRef}
        whenCreated={setMap}
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
          pins.map((venue) => (
            <Marker
              key={venue.veunue_id}
              position={[venue.lat, venue.long]}
              eventHandlers={{ click: (e) => setCurrentPlaceId(venue) }} //setActiveVenue(venue)
              icon={
                venue.type === "architecture" ? coolMarkerArc : coolMarkerPaint
              }
            />
          ))}
        {currentPlaceId && (
          <Popup position={[currentPlaceId.lat, currentPlaceId.long]}>
            <div className="card">
              <h2>{currentPlaceId.name}</h2>
              <p>{currentPlaceId.description}</p>
              <span>
                {currentPlaceId.address} in {currentPlaceId.city}
              </span>
              <p className="date">Created {format(currentPlaceId.createdAt)}</p>
            </div>
          </Popup>
        )}

        {positions && (
          <Popup
            position={[positions[0], positions[1]]}
            eventHandlers={{ click: (e) => console.log("Hy") }}
          >
            <div className="card">
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  placeholder="enter a name"
                  //onChange={(e) => setName(e.target.value)}
                />
                <label>Type</label>
                <select ref={typeRef} name="" id="">
                  {/*onChange={(e) => setType(e.target.value)}*/}
                  <option value="architecture">Architecture</option>
                  <option value="painting">Painitng</option>
                  <option value="sulpture">Sulpture</option>
                  <option value="music">Music</option>
                  <option value="other">other</option>
                </select>
                <label>Description</label>
                <textarea
                  ref={descriptionRef}
                  type="text"
                  placeholder="enter a name"
                  //onChange={(e) => setDescription(e.target.value)}
                />
                <label>Public Acces ?</label>
                <input
                  ref={public_accessRef}
                  type="checkbox"
                  //onChange={(e) => setPublic_access(e.target.value)}
                />
                <label>Indoor ?</label>
                <input
                  ref={indoorRef}
                  type="checkbox"
                  //onChange={(e) => setIndoor(e.target.value)}
                />
                <label>Address</label>
                <input
                  ref={addressRef}
                  type="text"
                  placeholder="enter the address"
                  //onChange={(e) => setAddress(e.target.value)}
                />
                <label>City</label>
                <input
                  ref={cityRef}
                  type="text"
                  placeholder="enter the city"
                  //onChange={(e) => setCity(e.target.value)}
                />
                <label>Rating </label>
                <select ref={ratingRef} name="" id="">
                  {/* onChange={(e) => setRating(e.target.value)} */}
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <button type="submit" className="submitButton">
                  {" "}
                  Add Venue
                </button>
              </form>
            </div>
          </Popup>
        )}
        <LocationMarker positions={positions} setPositions={setPositions} />
        <Closer
          setPositions={setPositions}
          setCurrentPlaceId={setCurrentPlaceId}
        />
        <MyComponent />
      </MapContainer>
    </div>
  );
}

export default App;
