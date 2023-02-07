import '../Profile/MyProfile.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from "../Common/authContext";
import { useContext } from 'react';

// authCtx.isLoggedin 이 true 면 로그인
// import { dummyMembers } from '../Forum/Forum';

interface getUser {
  // id: number;
  name: string;
  email: string;
};

function Profile() {
  // const [userInfo, setUserInfo] = useState<getUser[] | null | any>();

  // const authCtx = useContext(AuthContext);

  const [profile, setProfile] = useState<getUser | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);

    const navigate = useNavigate();
    const navigateToProfileUpdate = () => {
      navigate('/profileupdate');
    };

    const url = 'api/member/me'
    const token = 'bearer ' + localStorage.getItem("token")
    useEffect(() => {
      // const params = {
      //   token: token
      // } 
      // console.log(params)

        axios.get(url, {
        headers: {
          Authorization: token
        },
      })
        .then((res) => {setProfile(res.data)
          console.log(profile)}
          )
        .catch((err:any) => 
        console.error(err));
      },[])
      console.log(profile)  
      
      
    if (profile===null) {
      return <div>해당유저가 없습니다...</div>;
    }


        
    //     // const imageUrl = ''

    //     axios.get(url).then((res) => {
    //         setUserInfo(res.data);
    //     });
    // }, []);
    // console.log(userInfo)

    return(
      // 프로필 컨테이너 파란 영역
      <div className='profile-container'>
        {/* 프로필 사진과 유저네임 */}
          <div className='picture-name'>
            <h1>{profile.name}</h1>
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


          {/* 팔로우 메시지 버튼 */}
            <div>
              <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-5"
              onClick={navigateToProfileUpdate}>
              Edit Profile
              </button>
              {/* <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-20">
              Follow
              </button>
              <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-10">
              Message
              </button> */}
            </div>
          </div>
          <div>

          </div>
          <div className='content-box'>
            <div className=''>

            </div>

          </div>
      </div>
        
    );
}

export default Profile;
