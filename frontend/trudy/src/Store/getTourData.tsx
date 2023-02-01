import React, { useState, useEffect } from "react";

interface getTourData {
  url: string;
}

interface getTourResponse {
  id: number;
  addr1: string;
  areaCode: string | undefined;
  cat1: string;
  cat2: string | undefined;
  cat3: string | undefined;
  contentId: number;
  contentTypeId: number;
  createdtTime: number;
  firstImage: string | undefined;
  firstImage2: string | undefined;
  mapx: string;
  mapy: string;
  mlevel: string;
  sigunguCode: string;
  modifiedTime: string | undefined;
  readCount: string | undefined;
  tel: string | undefined;
  title: string;
  zipcode: string | undefined;
}

export const trudygetTourData = (url: getTourData) => {
  const [response, setResponse] = useState<getTourResponse[]>();
};
