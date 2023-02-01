import React, { useState, useEffect } from "react";

interface getTourData {
  url: string;
}


interface getTourResponse {
  id: number;
  addr1: string;
  areaCode: number;
  cat1: string;
  cat2: string;
  cat3: string;
  contentId: number;
  contentTypeId: number;
  createdtTime: number;
  mapx: number;
  mapy: number;
  sigunguCode: number;
  zipcode: number;
}


export const getTourData = (url:getTourData) => {
  const [response, setResponse] = useState<getTourResponse[]>();}