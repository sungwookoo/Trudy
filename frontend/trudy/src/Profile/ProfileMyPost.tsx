import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";



export default function ProfileMyPost(props:any) {


  const [getmypost, setGetMyPost] = useState<string | null>(null);


  const getMyPosts = () => {
    const url = 'api/post'
    axios.get(url)
    .then((response) => {setGetMyPost(response.data)
      console.log(response.data, 22222)})
    .catch((error:any) => console.error(error));
  }
  

return (
  <div>
    <div className='flex justify-center'>
  
      <div className='flex flex-col' onClick={getMyPosts}>
          가져오기
        <div className=''>

        </div>

      </div>

    </div>

  </div>
  
)
}