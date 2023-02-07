import React, { useState, useEffect } from "react";
import axios from "axios";

type Place = {
  id: number;
  title: string;
  lat: number;
  lng: number;
};

const PlaceList = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://localhost:8080.com/places");
        setPlaces(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {places.map((place) => (
        <li key={place.id}>
          {place.title} ({place.lat}, {place.lng})
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;
