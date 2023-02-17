import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import ProfileMyPost from "./ProfileMyPost";
import Follow from "./Follow";
import FollowerModal from "./FollowerModal";
import axiosInstance from "../Common/axiosInterceptor";
import defaultImage from "../assets/defaultImage.png";
import Sns from "./Sns";
import { areaList } from "../Filter/AreaCode";

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
            <h1 className="userInfo-username capitalize">{userInfo.name}</h1>
            <div className="ml-1 pt-1">
              <div className="flex">
                {userInfo.isLocal === "1" ? (
                  <div className="mr-1 border border-1 rounded-md px-1 mx-1 bg-green-200">
                    {userInfo.areaCode &&
                      areaList.map((area) => {
                        if (area.id === userInfo.areaCode) {
                          return area.name;
                        }
                      })}
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="capitalize border border-1 rounded-md px-1 mx-1 bg-green-200">
                  {userInfo.gender}
                </div>
                <div className="border border-1 rounded-md px-1 mx-1 bg-green-200 w-12">
                  {userInfo.isLocal === "1" ? "Local" : "Tourist"}
                </div>
              </div>

              {userInfo.introduceId && (
                <Sns
                  Facebook={userInfo.introduceId.facebook}
                  Instagram={userInfo.introduceId.instagram}
                  Twitter={userInfo.introduceId.twitter}
                  Github={userInfo.introduceId.github}
                />
              )}
            </div>
          </div>
        </div>
        <div className="edit-toggle-follow-container"></div>
        <div className="userprofile-intro mb-1 ml-52">
          {userInfo.introduceId ? userInfo.introduceId.self : ""}
        </div>
      </div>
      <div className="content-box grid grid-cols-2 place-content-center mb-2">
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

      <div className="user-about-me">
        <hr className="user-about-me-hr" />
        {!viewPost ? (
          <div className="flex flex-col userprofile-about-box mt-5">
            <div className="text-4xl font-semibold">I will show you</div>
            <div className="capitalize text-2xl mt-5">
              {userInfo.introduceId ? userInfo.introduceId.plan : ""}
            </div>

            <div className="text-4xl font-semibold mt-10">About me</div>
            <div className="capitalize text-2xl mt-5">
              {userInfo.introduceId ? userInfo.introduceId.title : ""}
            </div>

            <div className="text-4xl font-semibold mt-10">Language</div>
            <div className="capitalize text-2xl mt-5">
              {userInfo.introduceId ? userInfo.introduceId.language : ""}
            </div>
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
    // </div>
  );
};

export default UseruserInfo;
