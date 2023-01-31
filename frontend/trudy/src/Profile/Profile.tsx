import "../Profile/Profile.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

export type getUser = {
  id: number;
  username: string;
  email: string;
};

function Profile() {
  const [userInfo, setUserInfo] = useState<getUser[] | null>();

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    axios.get(url).then((res) => {
      setUserInfo(res.data);
    });
  }, []);
  console.log(userInfo);
  return (
    <div className="profile-container">
      <div className="picture-name">
        <img
          className="profile-picture"
          src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
          alt="profilepicture"
        />
        {userInfo?.map((user, i) => {
          return (
            <div className="user-name" key={user.id}>
              {user.username === "Bret" ? user.username : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
