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
  firstimage: any;
  firstimage2: string | undefined;
  mapx: any;
  mapy: any;
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
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(0);
  const [areaSigun, setareaSigun] = useState<any>("");
  const [contentTypeId, setcontentTypeId] = useState<any>("");
  const [keyword, setkeyword] = useState<any>("");
  const API_URL: string = "api/place";

  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    // props.setCenter({ lat: parseInt(place.mapy), lng: parseInt(place.mapx) });
    props.onPlaceClick(parseFloat(place.mapy), parseFloat(place.mapx));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await axios<any> ({
          // API_URL + `?offset=${offset}&limit=${limit}&areaSigun=${areaSigun}&contentTypeId=${contentTypeId}&keyword=${keyword}`
          method: "get",
          url: API_URL,
          params: {
            limit,
            offset,
            areaSigun,
            contentTypeId,
            keyword,
          },
        });

        setPlaces(resData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {places.map((data, i) => {
        return <PlaceForm key={i} data={data} onClick={() => handlePlaceClick(data)} />;
      })}
    </>
  );
}

export default Place;