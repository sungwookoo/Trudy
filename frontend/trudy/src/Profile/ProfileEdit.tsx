import "./ProfileEdit.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Common/authContext";
import { useContext } from "react";
import ProfileMyPost from "./ProfileMyPost";
import defaultImage from "../assets/defaultImage.png";
import axiosInstance from "../Common/axiosInterceptor";

// authCtx.isLoggedin 이 true 면 로그인
// import { dummyMembers } from '../Forum/Forum';

interface getUser {
  id?: number;
  name?: string;
  email?: string;
  gender?: string;
  image?: string;
  language?: string;
  plan?: string;
  self?: string;
  title?: string;
  introduction?: string;
  introduceId?: any | null;
  isLocal?: string;
  areaCode?: number;
}

const getFollow = {
  follower: 1,
  following: 2,
};

function Profile() {
  // const [userInfo, setUserInfo] = useState<getUser[] | null | any>();
  // const authCtx = useContext(AuthContext);
  const [getmypost, setGetMyPost] = useState<any>([]);
  const [profile, setProfile] = useState<getUser | null>(null);
  // const [getmypost, setGetMyPost] = useState<string | null>(null);
  const [updatedSelf, setUpdatedSelf] = useState<string>("");
  const [updatedPlan, setUpdatedPlan] = useState<string>("");
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedLanguage, setUpdatedLanguage] = useState<string>("");
  const [updatedPublic, setUpdatedPublic] = useState<string>("");
  const [updatedFacebook, setUpdatedFacebook] = useState<string>("");
  const [updatedTwitter, setUpdatedTwitter] = useState<string>("");
  const [updatedInstagram, setUpdatedInstagram] = useState<string>("");
  const [updatedGithub, setUpdatedGithub] = useState<string>("");
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("/profile");
  };

  const url = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setUpdatedSelf(res.data.introduceId.self);
        setUpdatedPlan(res.data.introduceId.plan);
        setUpdatedTitle(res.data.introduceId.title);
        setUpdatedLanguage(res.data.introduceId.language);
        setUpdatedPublic(res.data.isPublic);
        console.log(res.data.introduceId.title, 222);
        console.log(res.data, 11111);
      })
      .catch((err: any) => console.error(err));
  }, []);

  // 프로필 이미지 업로드
  const handleProfilePictureUpload = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axiosInstance
      .post("api/member/upload", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProfile({ ...profile, image: res.data.imageUrl });
        console.log(res, "업로드 성공");
      })
      .catch((err) => {
        console.log(err, "업로드 실패");
      });
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    console.log(token);
    try {
      const response = await axiosInstance.put(
        "api/member/intro",
        {
          plan: updatedPlan,
          self: updatedSelf,
          title: updatedTitle,
          language: updatedLanguage,
          facebook: updatedFacebook,
          instagram: updatedInstagram,
          twitter: updatedTwitter,
          github: updatedGithub,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response, "프로필 수정 성공");
      navigateToProfile();
      window.location.replace("/profile");
    } catch (error) {
      console.log(error, "프로필 수정 실패");
    }
  };

  // 프로필 공개여부
  const updatePublic = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "api/member/public",
        {
          isPublic: updatedPublic,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response, "프로필 공개여부 수정 성공");
      navigateToProfile();
      window.location.replace("/profile");
    } catch (error) {
      console.log(error, "프로필 공개여부 수정 실패");
    }
  };

  // 프로필 공개 토글 클릭
  const checkToggle = () => {
    // console.log(updatePublic, "여기");
    if (updatedPublic === "0") {
      setUpdatedPublic("1");
    } else {
      setUpdatedPublic("0");
    }
  };

  if (profile === null) {
    return <div className="flex justify-center">유저 찾는중.....</div>;
  }

  console.log(profile, 444);
  return (
    // 프로필 컨테이너 파란 영역
    <div className="profile-update-container">
      {/* 프로필 사진과 유저네임 */}
      <div className="picture-name-container">
        <div className="picture-name-row">
          {profile && (
            <img
              className="profile-picture hover:cursor-pointer"
              src={profile.image || defaultImage}
              onClick={() => {
                document.getElementById("profile-picture-upload")?.click();
              }}
            />
          )}
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureUpload} id="profile-picture-upload" style={{ display: "none" }} />

          <div>
            <h1 className="myprofile-username">{profile.name}</h1>

            <div className="flex">
              {profile.isLocal === "1" ? <div className="mr-8 border border-1 rounded-md px-1 mx-1 bg-green-200">{profile.areaCode}</div> : <div></div>}
              {/* <div className="mr-5">{profile.areaCode}</div> */}
              <div className="capitalize border border-1 rounded-md px-1 mx-1 bg-green-200">{profile.gender}</div>
            </div>
            <div className="border border-1 rounded-md px-1 mx-1 bg-green-200">{profile.isLocal === "1" ? "Local" : "Tourist"}</div>
            <div className="mt-4">
              {" "}
              Facebook :
              <textarea className="profile-intro-edit " value={updatedFacebook} onChange={(event) => setUpdatedFacebook(event.target.value)}>
                {profile.introduceId ? profile.introduceId.facebook : ""}
              </textarea>
            </div>
            <div className=" mt-4">
              {" "}
              Instagram :
              <textarea className="instagram-edit " value={updatedInstagram} onChange={(event) => setUpdatedInstagram(event.target.value)}>
                {profile.introduceId ? profile.introduceId.instagram : ""}
              </textarea>
            </div>
            <div className=" mt-4">
              {" "}
              Twitter :
              <textarea className="twitter-intro-edit " value={updatedTwitter} onChange={(event) => setUpdatedTwitter(event.target.value)}>
                {profile.introduceId ? profile.introduceId.twitter : ""}
              </textarea>
            </div>
            <div className="mt-4">
              {" "}
              Github :
              <textarea className="github-intro-edit " value={updatedGithub} onChange={(event) => setUpdatedGithub(event.target.value)}>
                {profile.introduceId ? profile.introduceId.github : ""}
              </textarea>
            </div>
          </div>
        </div>
        {/* 프로필 수정 내 프로필 공개 토글 */}
        <div className="edit-toggle-follow-container">
          {/* <ProfileUpdate /> */}
          <div className="flex items-center justify-center w-full mt-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-28 rounded-full mr-2"
              onClick={(e) => {
                updateProfile(e);
                updatePublic(e);
              }}
            >
              Save Edit
            </button>
            {/* 토글 바 */}
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only" onClick={checkToggle} defaultChecked={updatedPublic === "0" ? false : true} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </div>
          {/* 토글 바 끝 */}
          <div className="flex flex-col py-10">
            <div className="myprofile-gender mx-3 font-bold"></div>
          </div>
        </div>

        <div className="edit-profile-intro mt-4">
          <textarea className="profile-intro-edit " value={updatedSelf} onChange={(event) => setUpdatedSelf(event.target.value)}>
            {profile.introduceId ? profile.introduceId.self : ""}
          </textarea>
        </div>
      </div>
      <div className="content-box flex place-content-center mb-5">
        {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
        {/* <div className="about-post col-start-2 col-span-4 bg-yellow-500"> */}
        <div className="flex place-content-center font-bold text-4xl">About</div>
      </div>
      {/* </div> */}
      <div className="about-me grid grid-cols-1">
        <hr className="about-me-hr" />
        <div className="flex flex-col about-box mt-2">
          <div className="text-4xl flex flex-start font-semibold mt-6">I will show you</div>
          <div className="capitalize text-xl mt-3">
            <textarea className="profile-textarea-edit" value={updatedPlan} onChange={(event) => setUpdatedPlan(event.target.value)}>
              {profile.introduceId ? profile.introduceId.plan : ""}
            </textarea>
          </div>
          <div className="text-4xl font-semibold mt-6">About me</div>
          <div className="capitalize text-2xl mt-3">
            <textarea className="profile-textarea-edit" value={updatedTitle} onChange={(event) => setUpdatedTitle(event.target.value)}>
              {profile.introduceId ? profile.introduceId.title : ""}
            </textarea>
          </div>

          <div className="text-4xl font-semibold mt-6">Language</div>
          <div className="capitalize text-2xl mt-3">
            <textarea className="profile-textarea-edit" value={updatedLanguage} onChange={(event) => setUpdatedLanguage(event.target.value)}>
              {profile.introduceId ? profile.introduceId.language : ""}
            </textarea>
          </div>
        </div>
      </div>
      {/* <ProfileMyPost id={profile.id}/> */}
      {/* <ProfileMyPost /> */}

      {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
    </div>
  );
}

export default Profile;
