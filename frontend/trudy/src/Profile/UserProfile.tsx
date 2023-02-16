import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import ProfileMyPost from "./ProfileMyPost";
import Follow from "./Follow";
import FollowerModal from "./FollowerModal";
import axiosInstance from "../Common/axiosInterceptor";
import defaultImage from "../assets/defaultImage.png";

interface useruserInfoId {
  name: string;
  email: string;
}
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
const UseruserInfo = () => {
  const [userInfo, setUserInfo] = useState<getUser>({});
  const { state } = useLocation();
  let userId = useParams();
  const API_URL = "api/member";
  const token = "bearer " + localStorage.getItem("token");
  const [loginuser, setLoginUser] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [getuserpost, setGetUserPost] = useState<any>([]);
  const [viewPost, setViewPost] = useState<Boolean>(false);

  const getFollow = {
    follower: 1,
    following: 2,
  };

  const showModal = () => {
    setModalOpen(true);
  };

  // 해당 프로필 유저 정보 가져오기
  useEffect(() => {
    axiosInstance
      .get(`/${API_URL}/${userId.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        setGetUserPost(res.data.posts);
        console.log(res.data, "해당유저정보");
      })
      .catch((err: any) => console.error(err));
  }, []);

  // 로그인한 유저 정보 가져오기
  useEffect(() => {
    axiosInstance
      .get("/api/member/me", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLoginUser(res.data);
        const loginuserId = res.data.id;
        console.log(res.data, loginuserId);
      })
      .catch((err: any) => console.error(err, "여기에러"));
  }, []);

  // 나의 게시글 가져오기
  const getUserPosts = () => {
    const url = "api/post";
    axiosInstance
      .get(url)
      .then((res) => {
        setGetUserPost(res.data);
        console.log(res.data);
      })
      .catch((error: any) => console.error(error));
  };

  return (
    // 프로필 컨테이너 파란 영역
    <div className="userInfo-container">
      {/* 프로필 사진과 유저네임 */}
      <div className="picture-name-container">
        <div className="picture-name-row">
          <img
            className="userInfo-picture"
            src={userInfo.image || defaultImage}
          ></img>
          <div className="h-24 ml-3">
            <h1 className="userInfo-username capitalize image.png">{userInfo.name}</h1>
            <div className="ml-1 pt-1">
            <div className="flex">
            {userInfo.isLocal === "1" ? (
                <div className="mr-8">{userInfo.areaCode}</div>
                ) : ( 
                <div></div>
                )}
                <div className="capitalize">{userInfo.gender}</div>
              </div>
              <div className=''>{userInfo.isLocal === '1' ? 'Local' : 'Tourist'}</div>
            </div>
          </div>
        </div>
        <div className="edit-toggle-follow-container">
          {/* <div className="flex mt-5">
        <Follow
        loginuserId={loginuser.id}
        userID={userInfo.id}
        />
        <button className="border-2 border-black hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full mr-5" >Message</button>
        
        </div> */}

          {/* <div className="flex flex-col py-10">
            <div className="flex flex-row">
              <div className="w-12 mx-9 font-bold">{getFollow.follower}</div>
              <div className="w-12 mx-3 font-bold">{getFollow.following}</div>
            </div>
            <div className="flex flex-row">
              <button className="mx-3 font-bold" onClick={showModal}>
                Follower
              </button>
              {modalOpen && (
                <FollowerModal
                  senduserID={userId}
                  setModalOpen={setModalOpen}
                />
              )}

              <div className="mx-3 font-bold">Following</div>
              <div className="userprofile-gender mx-3 font-bold">
                {userInfo.gender}
              </div>
            </div>
          </div>
        </div>
        <div className="userprofile-intro mb-1 ml-52">
          {userInfo.introduceId ? userInfo.introduceId.self : ""}
        </div>
      </div>
      <div className="content-box grid grid-cols-2 place-content-center mb-2">
        {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
        <div className="mx-16 flex place-content-center font-bold text-3xl hover:cursor-pointer" onClick={() => setViewPost(!viewPost)}>
          About
        </div>

        <div className="mx-16 flex place-content-center font-bold text-3xl hover:cursor-pointer" onClick={() => setViewPost(!viewPost)}>
          Posts
        </div>
      </div>

      <div className="user-about-me">
        <hr className="user-about-me-hr" />
        {!viewPost ? (
          <div className="flex flex-col userprofile-about-box mt-5">
            <div className="text-4xl font-semibold">I will show you</div>
            <div className="capitalize text-2xl mt-5">{userInfo.introduceId ? userInfo.introduceId.plan : ""}</div>

            <div className="text-4xl font-semibold mt-10">About me</div>
            <div className="capitalize text-2xl mt-5">{userInfo.introduceId ? userInfo.introduceId.title : ""}</div>

            <div className="text-4xl font-semibold mt-10">Language</div>
            <div className="capitalize text-2xl mt-5">{userInfo.introduceId ? userInfo.introduceId.language : ""}</div>
          </div>
        ) : (
          <div>
            {getuserpost.map((post: any, i: any) => (
              <ProfileMyPost key={i} post={post} memberdetails={userInfo.id} />
            ))}
          </div>
        )}
      </div>
      {/* <ProfileMyPost id={profile.id}/> */}
      {/* <ProfileMyPost /> */}

      {/* <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr> */}
    </div>
  );
};

export default UseruserInfo;
