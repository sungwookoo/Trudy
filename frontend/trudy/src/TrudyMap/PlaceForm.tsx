import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import nopictures from "../assets/nopictures.png";
import bookmark_yes from "../assets/star_yes.png";
import bookmark_no from "../assets/star_no.png";
import "../Common//Bookmark.css";

type PlaceFormProps = {
  place: {
    id: number;
    addr1: string;
    addr2?: string;
    contenttypeid?: string;
    firstimage: any;
    firstimage2?: string;
    mapx: any;
    mapy: any;
    title: string;
    singungucode: string;
    tel?: string;
    zipcode?: string;
  };
  bookmarkedIds?: number[];
  mapVisible?: boolean;
  onClick?: (mapx: string | number, mapy: string | number) => void;
  setbookmarkedIds: React.Dispatch<React.SetStateAction<any>>;
  setbookmarkList: React.Dispatch<React.SetStateAction<any>>;
  memberId?: number;
};

function PlaceForm({ place, onClick = () => {}, bookmarkedIds = [], setbookmarkedIds, setbookmarkList, memberId, mapVisible }: PlaceFormProps) {
  // state 정의 ----------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const token = "bearer " + localStorage.getItem("token");

  // 지도 센터 옮기기
  const handleClick = useCallback(() => {
    if (place.mapy !== undefined && place.mapx !== undefined && onClick) {
      onClick(place.mapy, place.mapx);
    }
  }, [onClick, place.mapy, place.mapx]);

  // 북마크 클릭
  // 북마크 되있으면 update시키고 delete 요청
  const handleBookmarkClick = async () => {
    setIsLoading(true);
    const isBookmarked = place.id ? bookmarkedIds?.includes(place.id) : false;
    if (isBookmarked) {
      try {
        const updatedBookmarkedIds = bookmarkedIds.filter((id) => id !== place.id);
        setbookmarkedIds(updatedBookmarkedIds);
        await axios.delete(`api/bookmark/delete`, {
          headers: {
            Authorization: token,
          },
          params: { memberId: memberId, placeId: place.id },
        });
      } catch (error) {
        console.error(error);
      }
      try {
        const nowBookMark = await axios.get(`api/bookmark?memberId=${memberId}`, {
          headers: {
            Authorization: token,
          },
        });
        setbookmarkList(nowBookMark.data);
      } catch (error) {
        console.error(error);
      }
      // 안되어있으면 추가하고 post 요청
    } else {
      try {
        const data = new FormData();
        data.append("memberId", JSON.stringify(memberId));
        data.append("placeId", JSON.stringify(place.id));
        {
          !bookmarkedIds.includes(place.id) && setbookmarkedIds([...bookmarkedIds, place.id]);
        }
        await axios.post(`api/bookmark/post`, data, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
      try {
        const nowBookMark = await axios.get(`api/bookmark?memberId=${memberId}`, {
          headers: {
            Authorization: token,
          },
        });
        setbookmarkList(nowBookMark.data);
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  const isBookmarked = place.id ? bookmarkedIds?.includes(place.id) : false;
  return (
    <>
      {mapVisible ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-5" onClick={handleClick} style={{ cursor: "pointer" }}>
          {place.firstimage ? (
            <img className="w-full h-64" src={place.firstimage} alt="Place thumbnail" />
          ) : (
            <img className="w-full h-64" src={nopictures} alt="Place thumbnail" />
          )}
          <div className="px-6 py-4 h-30">
            <h3 className="font-bold text-xl mb-2">{place.title}</h3>
          </div>
          {memberId && (
            <img
              src={isBookmarked ? `${bookmark_yes}` : `${bookmark_no}`}
              alt="bookmark"
              onClick={handleBookmarkClick}
              style={{ cursor: "pointer" }}
              className="star_img w-10"
            /> 
          )}
          {isLoading && <div></div>}
        </div>
      ) : (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-5" onClick={handleClick} style={{ cursor: "pointer" }}>
          {place.firstimage ? (
            <img className="w-full h-64" src={place.firstimage} alt="Place thumbnail" />
          ) : (
            <img className="w-full h-64" src={nopictures} alt="Place thumbnail" />
          )}
          <div className="px-6 py-4 h-64">
            <h2 className="font-bold text-2xl mb-2">{place.title}</h2>
            <br />
            {place.addr1 ? <h3 className="font-bold text-xl mb-2">{place.addr1}</h3> : <h3>sorry, no address info</h3>}
            {place.tel ? <h3 className="font-bold text-xl mb-2">{place.tel}</h3> : <h3>sorry, no tel info</h3>}
          </div>
          {memberId && (
            <img
              src={isBookmarked ? `${bookmark_yes}` : `${bookmark_yes}`}
              alt="bookmark"
              onClick={handleBookmarkClick}
              style={{ cursor: "pointer" }}
              className="star_img w-10"
            />
          )}
          {isLoading && <div></div>}
        </div>
      )}
    </>
  );
}

export default React.memo(PlaceForm);
