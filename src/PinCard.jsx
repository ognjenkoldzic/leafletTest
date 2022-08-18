import React from "react";
import { format } from "timeago.js";
import dummyImg from "./assets/dummy-person.jpg";
import axios from "axios";

export default function PinCard({
  onSetCurrentPlace,
  currentPlace,
  pins,
  onSetPins,
}) {
  // `http://localhost:8001/api/pins/${id}`//`https://young-fortress-38538.herokuapp.com/api/pins/${id}`
  const handleDelete = async (id) => {
    //console.log(id);
    try {
      const res = await axios.delete(
        `https://young-fortress-38538.herokuapp.com/api/pins/${id}`
      );

      const updatedPins = pins.filter((pin) => pin._id !== id);
      onSetPins(updatedPins);
      onSetCurrentPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(currentPlace);
  return (
    <div className="card">
      <h2>{currentPlace.name}</h2>
      <p>{currentPlace.description}</p>
      <span>
        {currentPlace.address} in {currentPlace.city}
      </span>
      <p className="date">Created {format(currentPlace.createdAt)}</p>

      {currentPlace.img_src ? (
        <img src={currentPlace.img_src} alt="ein bild " width="150" />
      ) : (
        <img src={dummyImg} alt="nur ein dummy" width="150" />
      )}
      <button onClick={() => handleDelete(currentPlace._id)}>
        Delete Venue
      </button>
    </div>
  );
}
