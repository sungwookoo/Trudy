import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLinkClickHandler } from "react-router-dom";
import PlaceForm from "./PlaceForm";

export type mapPlaceType = {
  id: number;
  addr1: string;
  addr2: string | undefined;
  cat1: string;
  cat2: string | undefined;
  cat3: string | undefined;
  contentId: string | undefined;
  contentTypeId: string | undefined;
  createdTime: string | undefined;
  firstImage: string;
  firstImage2: string | undefined;
  mapx: string | number;
  mapy: string | number;
  title: string;
  mlevel: string | undefined;
  modifiedTime: string | undefined;
  readCount: string | undefined;
  singunguCode: string;
  tel: string | undefined;
  zipcode: string | undefined;
};

function Place(props: any) {
  const [selectedPlace, setSelectedPlace] = useState<mapPlaceType | null>(null);
  const [places, setPlaces] = useState<mapPlaceType[]>([]);
  const API_URL: string = "api/place";

  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    // props.setCenter({ lat: parseInt(place.mapy), lng: parseInt(place.mapx) });
    props.onPlaceClick(place.mapy, place.mapx);
    console.log(typeof place.mapy);
  };
  useEffect(() => {
    axios.get(API_URL).then((res: any) => {
      // console.log("result.data: ", result.data.slice(1, 30));
      setPlaces([...res.data.data].slice(1, 10));
    });
  }, []);

  // })
  // await axios.get(API_URL)
  // .then(result =>
  //   console.log(result.data.data.length, 222)
  //     // console.log("result.data: ", result.data.slice(1, 30));
  //   setPlaces(result.data.data.slice(1, 30));
  //   console.log(places);
  //   )
  //   [API_URL]
  // );
  // // console.log(places);

  return (
    <>
      {places.map((data, i) => {
        // return data.title;
        // return <img src={data.firstImage} alt="Thumbnail"/>;

        return <PlaceForm key={i} data={data} onClick={() => handlePlaceClick(data)} />;
      })}
    </>
  );
}

export default Place;
