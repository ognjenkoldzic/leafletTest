import React, { useRef } from "react";
import axios from "axios";

function AddNewPinForm({ onSetPins, onSetPositions, positions, pins }) {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const descriptionRef = useRef(null);
  const public_accessRef = useRef(null);
  const indoorRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const ratingRef = useRef(0);

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
      onSetPins([...pins, res.data]); //
      onSetPositions(null);
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
}

export default AddNewPinForm;
