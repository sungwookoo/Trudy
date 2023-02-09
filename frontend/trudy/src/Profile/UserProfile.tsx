import React, { useState, useEffect } from "react";
import axios from 'axios';


interface userProfileId {
  name: string;
  email: string;
}

function UserProfile (userProfileId: any) {

  console.log(userProfileId)
  // const [userProfileId, setUserProfileId] = useState({} as userProfileId);
  
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
      <p>Username: {userProfileId.name}</p>
      <p>Email: {userProfileId.email}</p>
      {/* Add other information here */}
    </div>
  );
};

export default UserProfile;