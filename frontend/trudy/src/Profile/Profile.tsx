import '../Profile/Profile.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { dummyMembers } from '../Forum/Forum';


export type getUser = {
  id: number;
  username: string;
  email: string;
};

function Profile() {
  const [userInfo, setUserInfo] = useState<getUser[] | null>();

    const navigate = useNavigate();
    const navigateToProfileUpdate = () => {
      navigate('/profileupdate');
    };

    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/users'
        const imageUrl = ''

        axios.get(url).then((res) => {
            setUserInfo(res.data);
        });
    }, []);
    console.log(userInfo)
    return(
      // 프로필 컨테이너 파란 영역
      <div className='profile-container'>
        {/* 프로필 사진과 유저네임 */}
          <div className='picture-name'>
            
            {dummyMembers.map((member:any) => {
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
                  </div>
                  </div>
                )
              })
            }

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
