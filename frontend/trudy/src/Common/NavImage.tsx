import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfileImage() {
  const [profileImage, setProfileImage] = useState(null);

  const token = "bearer " + localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get("api/member/me", {
          headers: {
            Authorization: token,
          },
        });
        setProfileImage(response.data.image);
        console.log(profileImage, "정보");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileImage();
  }, [token]);

  return (
    <>
      {profileImage ? (
        <img
          className="mr-2"
          src={profileImage}
          alt="User profile image"
          style={{ width: "40px", height: "40px", borderRadius: "20%" }}
        />
      ) : (
        <img
          src="/default-profile-image.jpg"
          alt="Default profile image"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      )}
    </>
  );
}

export default UserProfileImage;
