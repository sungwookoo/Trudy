import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../assets/defaultImage.png";

function UserProfileImage() {
  const [profileImage, setProfileImage] = useState(null);

  const token = "bearer " + localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get("/api/member/me", {
          headers: {
            Authorization: token,
          },
        });
        setProfileImage(response.data.image);
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
          src={defaultImage}
          alt="Default profile image"
          style={{ width: "40px", height: "40px", borderRadius: "20%" }}
        />
      )}
    </>
  );
}

export default UserProfileImage;
