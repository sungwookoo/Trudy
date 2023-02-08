import React, { useCallback } from "react";

type PlaceFormProps = {
  data: {
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
  onClick: (mapx: string | number, mapy: string | number) => void;
};

function PlaceForm({ data, onClick }: any) {
  const handleClick = useCallback(() => {
    onClick(data.mapy, data.mapx);
  }, [onClick]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-5" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img className="w-full" src={data.firstimage} alt="Place thumbnail" />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{data.title}</h3>
      </div>
    </div>
  );
}

export default PlaceForm;
