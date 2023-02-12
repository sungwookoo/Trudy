import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


interface Props {
    userId: number;
}

function Following (userId: Props) {
    
    const [followings, setFollowings] = useState<any>([]);

    const fetchFollowings = async () => {
      const response = await axios.get(`/api/member/following/${userId.userId}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        }
      });
      setFollowings(response.data);
      console.log(response.data, '팔로우리스트');
    };

    useEffect(() => {
        fetchFollowings();
    }, []);

    return (
        <div>
            {/* {followings.map((following: any) => (
                <div key={following.id}>
                    <img src={following.profileImage} alt="profileImage" />
                    <span>{following.name}</span>
                </div>
            ))} */}
        </div>
    )

};

export default Following;