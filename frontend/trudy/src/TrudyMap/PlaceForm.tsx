import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

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
  onClick?: (mapx: string | number, mapy: string | number) => void;
  setbookmarkedIds: React.Dispatch<React.SetStateAction<any>>;
};

function PlaceForm({
  place,
  onClick = () => {},
  bookmarkedIds = [],
  setbookmarkedIds,
}: PlaceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const token = "bearer " + localStorage.getItem("token");
  const handleClick = useCallback(() => {
    if (place.mapy !== undefined && place.mapx !== undefined && onClick) {
      onClick(place.mapy, place.mapx);
    }
  }, [onClick, place.mapy, place.mapx]);

  const handleBookmarkClick = async () => {
    setIsLoading(true);
    const isBookmarked = place.id ? bookmarkedIds?.includes(place.id) : false;
    if (isBookmarked) {
      try {
        const updatedBookmarkedIds = bookmarkedIds.filter(
          (id) => id !== place.id
        );
        setbookmarkedIds(updatedBookmarkedIds);
        await axios.delete(`api/bookmark/delete`, {
          headers: {
            Authorization: token,
          },
          params: { memberId: 2, placeId: place.id },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setbookmarkedIds([...bookmarkedIds, place.id]);
        await axios.post(`api/bookmark/post/`, {
          headers: {
            Authorization: token,
          },
          data: {
            memberId: 2,
            placeId: place.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  const isBookmarked = place.id ? bookmarkedIds?.includes(place.id) : false;
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-5"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img className="w-full" src={place.firstimage} alt="Place thumbnail" />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{place.title}</h3>
      </div>
      <img
        src={
          isBookmarked
            ? "https://cdn-icons-png.flaticon.com/128/4101/4101575.png"
            : "https://cdn-icons-png.flaticon.com/128/4101/4101579.png"
        }
        alt="bookmark"
        onClick={handleBookmarkClick}
        style={{ cursor: "pointer" }}
      />
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default PlaceForm;
