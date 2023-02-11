import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

interface useruserInfoId {
  name: string;
  email: string;
}
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
const UseruserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>([]);
  const { state } = useLocation();
  let userId = useParams();
  const API_URL = "api/member";
  const token = "bearer " + localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/${API_URL}/${userId.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err: any) => console.error(err));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(`api/members/${props.userId}`)
  //     .then(response => {
  //       setUseruserInfoId(response.data);
  //     })
  //     .catch(error => console.error(error));
  // }, [props.userId]);

  return (
    // 프로필 컨테이너 파란 영역
    <div className="userInfo-container">
      {/* 프로필 사진과 유저네임 */}
      <div className="picture-name-container">
        <div className="picture-name-row">
          <img className="userInfo-picture" src={userInfo.image}></img>
          {/* <div className=''>{userInfo.id}</div> */}
          <h1 className="myuserInfo-username">{userInfo.name}</h1>
        </div>
        {/* <p className='mt-10'>{userInfo.email}</p> */}
        {/* {userInfo.map((member:any) => {
               return (
                 <div>
                   <div>
                     <img className='userInfo-picture'
                     src={member.image}
                     alt="userInfopicture" 
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

        <hr className="border-black border-1 mx-12 mt-2 mb-2"></hr>
      </div>
    </div>
  );
};

export default UseruserInfo;
