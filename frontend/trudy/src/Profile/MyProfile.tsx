import "../Profile/MyProfile.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Common/authContext";
import { useContext } from "react";
import ProfileMyPost from "./ProfileMyPost";
import Avatar from "react-avatar";
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
  thumbnailImage?: string;
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
  const [viewPost, setViewPost] = useState<Boolean>(false);
  const [profileImg, setProfileImg] = useState<string | any>(null);

  // const [getmypost, setGetMyPost] = useState<string | null>(null);

  const navigate = useNavigate();
  const navigateToProfileUpdate = () => {
    navigate("/profileedit");
  };

  const url = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");

  //  나의 게시글 가져오기
  const getMyPosts = () => {
    axiosInstance
      .get("api/post", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // setGetMyPost(res.data.content);
        console.log(res.data.content, "겟 마이 포스트");
      })
      .catch((error: any) => console.error(error));
  };

  useEffect(() => {
    axiosInstance
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setGetMyPost(res.data.posts);

        // getMyPosts();
        console.log(res.data, "멤버 받는값");
      })
      .catch((err: any) => console.error(err));
  }, []);

  if (profile === null) {
    return <div className="flex justify-center">유저 찾는중.....</div>;
  }

  // console.log(profile, "내 프로필 정보");
  return (
    // 프로필 컨테이너 파란 영역
    <div className="profile-container">
      {/* 프로필 사진과 유저네임 */}
      <div className="picture-name-container">
        <div className="picture-name-row">
          <img
            className="profile-picture"
            src={profile.image || defaultImage}
          ></img>

          <div className="h-24 ml-3">
            <h1 className="myprofile-username capitalize">{profile.name}</h1>
            <div className="ml-1 pt-1">
              <div className="flex">
                {profile.isLocal === "1" ? (
                <div className="mr-8">{profile.areaCode}</div>
                ) : ( 
                <div></div>
                )}
                <div className="capitalize">{profile.gender}</div>
              </div>
              <div className=''>{profile.isLocal === '1' ? 'Local' : 'Tourist'}</div>
            </div>
          </div>
        </div>
        {/* 프로필 수정 내 프로필 공개 토글 */}
        <div className="edit-toggle-follow-container">
          {/* <ProfileUpdate /> */}
          <div className="flex items-center justify-center w-full mt-6">
            <button
              className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-5"
              onClick={navigateToProfileUpdate}
            >
              Edit Profile
            </button>
            {/* 토글 바 */}
            {/* <label
              htmlFor="toggleB"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label> */}
            {/* 토글 바 끝 */}
          </div>
        </div>

        <div className="myprofile-intro mb-1 ml-52">
          {profile.introduceId ? profile.introduceId.self : ""}
        </div>
      </div>
      <div className="content-box grid grid-cols-2 place-content-center mb-2">
        {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
        {/* <div className="about-post col-start-2 col-span-4 bg-yellow-500"> */}
        <div
          className="mx-16 flex place-content-center font-bold text-3xl hover:cursor-pointer"
          onClick={() => setViewPost(!viewPost)}
        >
          About
        </div>

        <div
          className="mx-16 flex place-content-center font-bold text-3xl hover:cursor-pointer"
          onClick={() => setViewPost(!viewPost)}
        >
          Posts
        </div>
      </div>
      {/* </div> */}
      <div>
        <div className="about-me mx-auto">
          <hr className="about-me-hr" />
          {!viewPost ? (
            <div className="flex flex-col about-box mt-5">
              <div className="text-4xl font-semibold mt-10">
                I will show you
              </div>
              <div className="capitalize text-xl mt-5">
                {profile.introduceId ? profile.introduceId.plan : ""}
              </div>
              <div className="text-4xl font-semibold mt-10">About me</div>
              <div className="capitalize text-2xl mt-5">
                {profile.introduceId ? profile.introduceId.title : ""}
              </div>

              <div className="text-4xl font-semibold mt-10">Language</div>
              <div className="capitalize text-2xl mt-5">
                {profile.introduceId ? profile.introduceId.language : ""}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1">
              {getmypost.map((post: any, i: any) => (
                <ProfileMyPost key={i} post={post} memberdetails={profile.id} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <ProfileMyPost id={profile.id}/> */}
      {/* <ProfileMyPost /> */}

      {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
    </div>
  );
}

export default Profile;
