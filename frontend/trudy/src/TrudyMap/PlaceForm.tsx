import { useNavigate } from "react-router";
import React from "react";
import { mapPlaceType } from "./Place";

function PlaceForm({ data }: { data: mapPlaceType }) {
  return (
    <div className="item-container">
      {/* 포럼 아이템 개별 상자 */}
      <div className="item-box">
        <img className="thumbnail-image" src={data.firstImage} alt="Thumbnail"></img>
        <div>{data.title}</div>
        <div>{data.addr1}</div>
      </div>
    </div>
  );
}

export default PlaceForm;
