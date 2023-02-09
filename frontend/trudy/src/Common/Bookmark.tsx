import axios from "axios";
import React, { useState, useEffect } from "react";


interface BookmarkProps {
  memberId: number;
  placeId: number;
}

function Bookmark({memberId, placeId}: BookmarkProps) {

  const [isbookmarked, setIsBookmarked] = useState<boolean>(false);

  // console.log(memberId)
  // console.log(placeId)
  useEffect(() => {
    const getBookmarkStatus = async () => {
      try {
        const response = await axios.get(`api/bookmark?memberId=${memberId}`);
        setIsBookmarked(response.data)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarkStatus();
  },[])


  const handleBookmark = async () => {
    try {
      if (isbookmarked) {
        console.log('yes')
        await axios.delete(`api/bookmark/delete?memberId=${memberId}&placeId=${placeId}`);
        setIsBookmarked(!isbookmarked);
      } else {
        await axios.post(`api/bookmark/post?memberId=${memberId}&placeId=${placeId}`);
        setIsBookmarked(!isbookmarked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <button onClick={handleBookmark}>
      {isbookmarked ? <h1>Bookmark</h1> : <h1>Unbookmark</h1>}
    </button>
  );
}


export default Bookmark;


