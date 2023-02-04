import React, { useCallback } from "react";

type PlaceFormProps = {
  data: {
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
  onClick: (mapx: string | number, mapy: string | number) => void;
};

function PlaceForm({ data, onClick }: PlaceFormProps) {
  const handleClick = useCallback(() => {
    onClick(data.mapx, data.mapy);
  }, [data.mapx, data.mapy, onClick]);
  console.log(data.firstImage)
  return (
    <div onClick={handleClick} style={{ display: "inline-block", cursor: "pointer" }}>
      {data.firstImage ? <img src={data.firstImage} alt="Place thumbnail" /> : ''}
      <h3>{data.title}</h3>
    </div>
  );
}

export default PlaceForm;
