import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

interface userProfileId {
  name: string;
  email: string;
}

const UserProfile = () => {
  const { state } = useLocation();
  let userId = useParams();
  const API_URL = "api/member";
  useEffect(() => {
    const userInfo = axios.get(`/${API_URL}/${userId.id}`);
    console.log(userInfo);
  });
  // useEffect(() => {
  //   axios
  //     .get(`api/members/${props.userId}`)
  //     .then(response => {
  //       setUserProfileId(response.data);
  //     })
  //     .catch(error => console.error(error));
  // }, [props.userId]);

  return (
    <div>
      <h1>User Profile</h1>
      {/* <p>Username: {userProfileId.name}</p> */}
      {/* <p>Email: {userProfileId.email}</p> */}
      {/* Add other information here */}
    </div>
  );
};

export default UserProfile;
