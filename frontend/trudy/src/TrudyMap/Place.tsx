import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaceForm from "./PlaceForm";
import qs from "qs";

export type mapPlaceType = {
  id: number;
  addr1: string;
  addr2: string | undefined;
  contenttypeid: string | undefined;
  firstimage: any;
  firstimage2: string | undefined;
  mapx: any;
  mapy: any;
  title: string;
  singungucode: string;
  tel: string | undefined;
  zipcode: string | undefined;
};

type PP = {
  paramsSerializer: any;
};

function Place(props: any) {
  const [selectedPlace, setSelectedPlace] = useState<mapPlaceType | null>(null);
  const [places, setPlaces] = useState<mapPlaceType[]>([]);
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(2);
  const [areaSigun, setareaSigun] = useState<any>([6, 1]);
  const [contentTypeId, setcontentTypeId] = useState<any>([]);
  const [keyword, setkeyword] = useState<any>("");
  const API_URL: string = "api/place";

  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    props.onPlaceClick(parseFloat(place.mapy), parseFloat(place.mapx));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axios.get(
          API_URL + `?offset=${offset}&limit=${limit}&areaSigun=${areaSigun}&contentTypeId=${contentTypeId}&keyword=${keyword}`
          // url: API_URL,
          // params: {
          //   limit,
          //   offset,
          //   areaSigun,
          //   contentTypeId,
          //   keyword,
          // },
          // paramsSerializer: {
          //   encode: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
          // },
        );
        setPlaces(resData.data);
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(places);

  return (
    <>
      {places &&
        places.map((data, i) => {
          return <PlaceForm key={i} data={data} onClick={() => handlePlaceClick(data)} />;
        })}
    </>
  );
}

export default Place;
