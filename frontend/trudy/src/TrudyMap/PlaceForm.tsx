import React, { useCallback } from "react";

type PlaceFormProps = {
  data: {
    id: number;
    firstImage: string;
    title: string;
    mapx: string | number;
    mapy: string | number;
  };
  onClick: (mapx: string | number, mapy: string | number) => void;
};

function PlaceForm({ data, onClick }: PlaceFormProps) {
  const handleClick = useCallback(() => {
    onClick(data.mapx, data.mapy);
  }, [data.mapx, data.mapy, onClick]);

  return (
    <div onClick={handleClick} style={{ display: "inline-block", cursor: "pointer" }}>
      <img src={data.firstImage} alt="Place thumbnail" />
      <h3>{data.title}</h3>
    </div>
  );
}

export default PlaceForm;
