import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  userID: any;
  loginuserId: any;
}

function FollowButton({ userID, loginuserId } :any ) {
  const [isFollowing, setisFollowing] = useState(false);
  const [loginuser, setLoginUser] = useState<any>([]);
  
  

  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     const myres = await axios.get("api/member/me", {
  //       headers: {
  //         Authorization: "bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       setLoginUser(res.data);

  //       console.log(res.data);
  //       fetchFollowedUsers();
  //     })
  //     .catch((err: any) => console.error(err));
  //   };
  //   getLoggedInUser();
    
  // }, []);
    
    const fetchFollowedUsers = async () => {
      const response = await axios.get(`api/follow/${loginuserId}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      const followedUsers = response.data;
      const isFollowing = followedUsers.some((user: any) => user.id === userID);
      setisFollowing(isFollowing);
    };


  
  // const handleClick = () => {
  //   setFollowing(!following);
  // };

  // return <button onClick={handleClick}>{following ? "Unfollow" : "Follow"}</button>;

return(
  <div>
    {isFollowing? (
      <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-5">
      Unfollow
      </button>
      ) : (
      <button
      className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-5">
      Follow
      </button>
    )}
  </div>
);
};

export default FollowButton;
