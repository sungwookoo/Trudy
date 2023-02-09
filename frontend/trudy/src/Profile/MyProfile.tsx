import "../Profile/MyProfile.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Common/authContext";
import { useContext } from "react";
import ProfileMyPost from "./ProfileMyPost";

// authCtx.isLoggedin 이 true 면 로그인
// import { dummyMembers } from '../Forum/Forum';

interface getUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  image: string;
  language: string;
  plan: string;
  self: string;
  title: string;
  introduction: string;
  introduceId: any;
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
  // const [getmypost, setGetMyPost] = useState<string | null>(null);

  const navigate = useNavigate();
  const navigateToProfileUpdate = () => {
    navigate("/profileupdate");
  };

  const url = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");
  useEffect(() => {
    // const params = {
    //   token: token
    // }
    // console.log(params)

    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
      })
      .catch((err: any) => console.error(err));
  }, []);
  // console.log(profile)

  if (profile === null) {
    return <div className="flex justify-center">유저 찾는중.....</div>;
  }

  // 나의 게시글 가져오기
  const getMyPosts = () => {
    const url = "api/post";
    axios
      .get(url)
      .then((res) => {
        setGetMyPost(res.data);
        console.log(res.data);
      })
      .catch((error: any) => console.error(error));
  };

  // const memberdetails = {
  //   id: profile.id,
  //   // name: profile.name,
  // }

  // console.log(mymemberdetails)
  // useEffect(() => {
  //   const url = 'api/member/me/post'

  //     // const imageUrl = ''

  //     axios.get(url).then((res) => {
  //         setUserInfo(res.data);
  //     });
  // }, []);
  // console.log(userInfo)
  console.log(profile.id, 444);
  return (
    // 프로필 컨테이너 파란 영역
    <div className="profile-container">
      {/* 프로필 사진과 유저네임 */}
      <div className="picture-name-container">
        <div className="picture-name-row">
          <img className="profile-picture" src={profile.image}></img>
          {/* <div className=''>{profile.id}</div> */}
          <h1 className="myprofile-username">{profile.name}</h1>
        </div>
        {/* <p className='mt-10'>{profile.email}</p> */}
        {/* {userInfo.map((member:any) => {
                return (
                  <div>
                    <div>
                      <img className='profile-picture'
                      src={member.image}
                      alt="profilepicture" 
                      />
                    </div>
                  <div className='user-name' key={member.id}>
                    { member.name }
                    {/* { user.username === 'Kamren' ? user.username : '' } */}
        {/* </div>
                  </div>
                )
              })
            }
          }
          //  */}

        {/* 프로필 수정 내 프로필 공개 토글 */}
        <div className="edit-toggle-follow-container">
          {/* <ProfileUpdate /> */}
          <div className="flex items-center justify-center w-full mt-6">
            <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-5" onClick={navigateToProfileUpdate}>
              Edit Profile
            </button>
            {/* 토글 바 */}
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </div>
          {/* 토글 바 끝 */}
          <div className="flex flex-col py-10">
            <div className="flex flex-row bg-green-500">
              <div className="w-12 mx-9 font-bold">{getFollow.follower}</div>
              <div className="w-12 mx-3 font-bold">{getFollow.following}</div>
            </div>
            <div className="flex flex-row bg-green-500">
              <div className="mx-3 font-bold">Follower</div>
              <div className="mx-3 font-bold">Following</div>
              <div className="myprofile-gender mx-3 font-bold">{profile.gender}</div>
            </div>
          </div>
        </div>
        <div className="myprofile-intro">{profile.introduceId.self}</div>
      </div>

      <div></div>
      <div className="content-box">
        <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr>
        <div className="about-post flex flex-row">
          <div className="mx-16 bg-red-500" onClick={() => setViewPost(!viewPost)}>
            About
          </div>

          <div className="mx-16 bg-red-500" onClick={() => setViewPost(!viewPost)}>
            Posts
          </div>
        </div>
        {!viewPost ? (
          <div className="bg-red-500 flex flex-col mt-10">
            <div className="flex flex-row">
              <div className="ml-12">I will show you</div>
              <div className="ml-36">{profile.introduceId.plan}</div>
            </div>
            <div className="flex flex-row mt-20">
              <div className="ml-12">About me</div>
              <div className="ml-44">{profile.introduceId.title}</div>
            </div>
            <div className="flex flex-row mt-20">
              <div className="ml-12 font">Language</div>
              <div className="ml-44">{profile.introduceId.language}</div>
            </div>
          </div>
        ) : (
          <div>
            {getmypost.map((post: any, i: any) => (
              <ProfileMyPost key={i} post={post} memberdetails={profile.id} />
            ))}
          </div>
        )}

        {/* <ProfileMyPost id={profile.id}/> */}
        {/* <ProfileMyPost /> */}

        <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr>
      </div>
    </div>
  );
}

export default Profile;
