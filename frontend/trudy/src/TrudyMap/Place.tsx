import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import PlaceForm from "./PlaceForm";

type mapPlace = {
  id: number;
  addr1: string;
  addr2: string | undefined;
  cat1: string;
  cat2: string | undefined;
  cat3: string | undefined;
  contentId: string | undefined;
  contentTypeId: string | undefined;
  createdTime: string | undefined;
  firstImage: string | undefined;
  firstImage2: string | undefined;
  mapx: string;
  mapy: string;
  title: string;
  mlevel: string | undefined;
  modifiedTime: string | undefined;
  readCount: string | undefined;
  singunguCode: string;
  tel: string | undefined;
  zipcode: string | undefined;
};
function Place() {
  const [places, setPlaces] = useState<mapPlace[]>([]);
  const API_URL: string = "api/place";

  const getAPI = useCallback(
    async (e: any) => {
      e.preventDefault();
      const result = await axios.get(API_URL);
      // console.log("result.data: ", result.data.slice(1, 30));
      setPlaces(result.data.data.slice(1, 30));
      console.log(places);
    },
    [API_URL]
  );
  // console.log(places);

  return (
    <>
      <button onClick={getAPI}>Fetching Data!</button>;
      <img src={places[1].firstImage} alt="" />
      <div>{places[1].title}</div>
      <div>{places[1].addr1}</div>
      {/* {places.map((data, i) => {
        // <PlaceForm key={i} datas={data} />;
      // })} */}
    </>
  );
}

export default Place;
