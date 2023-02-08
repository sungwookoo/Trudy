import React, { useState } from 'react';
import '../Profile/ProfileUpdate.css'
import { useNavigate } from 'react-router';


interface UserData {
  username: string;
  introduction: string;
  profilePicture: string;
}

const initialUserData: UserData = {
  username: "John Doe",
  introduction: "Hello, I am a software engineer.",
  profilePicture: "https://picsum.photos/200"
};

function ProfileUpdate(props: any) {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const navigate = useNavigate();
    const navigateToProfile = () => {
      navigate('/profile');
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setUserData({ ...userData, profilePicture: e.target.result as string });
      }
    };
    reader.readAsDataURL(e.target.files![0]);
  };

  return (
    <div className='profile-update-container'>
      <img src={userData.profilePicture} alt={userData.username} />
      <br />
      <input className='hide'
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
      />
      {/* <button children='이미지 업로드' onClick={}></button> */}
      <br />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="introduction">Introduction:</label>
      <input className='intro-text'
        id="introduction"
        name="introduction"
        value={userData.introduction}
        onChange={handleInputChange}
      />
      <br />
      <button className='bg-green-500 px-2 py-1 rounded-full' onClick={navigateToProfile}>Save Changes</button>
    </div>
  );
};

export default ProfileUpdate;