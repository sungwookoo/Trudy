import { useNavigate } from "react-router";
import React from "react";

function PlaceForm(props: any) {
  return (
    <div className="item-container">
      {/* 포럼 아이템 개별 상자 */}
      <div className="item-box">
        <img className="thumbnail-image" src={props.firstImage} alt="Tumbnail"></img>
        <div>{props.title}</div>
        <div>{props.addr1}</div>
      </div>
    </div>
  );
}

export default PlaceForm;
