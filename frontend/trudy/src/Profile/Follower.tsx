import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../Common/axiosInterceptor";

interface Props {
  userId: number;
}

function Follower(userId: Props) {
  const [followers, setFollowers] = useState<any>([]);

  const fetchFollowers = async () => {
    const response = await axiosInstance.get(
      `/api/member/follower/${userId.userId}`,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    );
    setFollowers(response.data);
    console.log(response.data, "팔로우리스트");
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  return (
    <div>
      {/* {followers.map((follower: any) => (
                <div key={follower.id}>
                    <img src={follower.profileImage} alt="profileImage" />
                    <span>{follower.name}</span>
                </div>
            ))} */}
    </div>
  );
}

export default Follower;
