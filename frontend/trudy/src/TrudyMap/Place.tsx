import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [offset, setOffset] = useState<any>(1);
  const [areaSigun, setareaSigun] = useState<Array<any>>([]);
  const [contentTypeId, setcontentTypeId] = useState<Array<number>>([]);
  const [keyword, setkeyword] = useState<any>("");
  const API_URL: string = "api/place";

  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    props.onPlaceClick(parseFloat(place.mapy), parseFloat(place.mapx));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await axios.get<mapPlaceType[]>(API_URL, {
          params: {
            limit,
            offset,
            // areaSigun: encodeURIComponent(JSON.stringify(areaSigun)),
            areaSigun,
            // contentTypeId: encodeURIComponent(JSON.stringify(contentTypeId)),
            contentTypeId,
            keyword,
          },
        });
        setPlaces(resData.data);
      } catch (error) {
        console.error(error);
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
