import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Common/axiosInterceptor";

interface Props {
  userID: any;
  loginuserId: any;
}

function FollowButton({ userID, loginuserId }: any) {
  const [isFollowing, setisFollowing] = useState(false);
  const [loginuser, setLoginUser] = useState<any>([]);

  const token = "bearer " + localStorage.getItem("token");

  const fetchFollowedUsers = async () => {
    const response = await axiosInstance.get(`api/follow/${loginuserId}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });
    const followedUsers = response.data;
    const isFollowing = followedUsers.some((user: any) => user.id === userID);
    setisFollowing(isFollowing);
  };

  const handleClick = () => {
    if (!isFollowing) {
      axiosInstance.post(`/api/member/follow/${userID}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("팔로우성공");
    } else {
      axiosInstance.delete(`/api/member/follow/${userID}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("언팔로우성공");
    }
    setisFollowing(!isFollowing);
  };

  // return <button onClick={handleClick}>{following ? "Unfollow" : "Follow"}</button>;

  return (
    <div>
      {isFollowing ? (
        <button
          className="border-2 border-black hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full mr-5"
          onClick={handleClick}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="border-2 border-black hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full mr-5"
          onClick={handleClick}
        >
          Follow
        </button>
      )}
    </div>
  );
}

export default FollowButton;
