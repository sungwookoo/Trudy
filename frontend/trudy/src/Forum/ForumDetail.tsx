import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './ForumDetail.css'
import AuthContext from "../Common/authContext";

interface IForumDetailProps {
  post_id: number;
  // setForumItem: (post: IgetForumResponse) => void;
}

function ForumDetail() {
  const navigate = useNavigate();
  const forumnavigate = () => {
    navigate(-1);
  };
  const authCtx = useContext(AuthContext);
  const loggedinId = authCtx.loggedInfo.uid;
  const [isloggedin, setIsloggedin] = useState(false);
  const { id } = useParams<{ id: string }>(); // destructure the ID from useParams and specify its type
  const [forumMember, setforumMember] = useState<any>(null);
  // console.log(postId, '포스트아이디')
  // const {post_id, setForumItem } = props;
  const [forumItem, setForumItem] = useState<any>(null);
  // const [isForumLoaded, setIsForumLoaded] = useState(false);
  // const token = useSelector((state: any) => state.Auth.token);
  // const navigate = useNavigate
  // console.log(loggedinId, '로그인아이디')
 
    const getForumItem = async () => {
      try {
        const response = await axios.get(`/api/post/${id}`);
        setForumItem(response.data.postCombine.postElement);
        if (loggedinId === response.data.postCombine.memberElement.id) {
          setIsloggedin(true);
        }
        // setforumMember(response.data.postCombine.memberElement.id);
        // console.log(forumMember, '로그인되었는지')
        // console.log(ForumItem., '포럼아이템유저아이디')
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {  
    getForumItem();
  }, [id]);

  // console.log(forumMember, '포럼멤버')
  // if (loggedinId === forumMember) {
  //   setIsloggedin(true);
  // }console.log(isloggedin, '로그인되었는지')

  return (
    // 밑에 포럼 컨테이너 밖에 back만들어야함
    <div className="forum-detail-container">
      {/* <div className=""> */}
      <div className="flex flex-row bg-red-500">
        <button className="rounded-md bg-gray-300 mx-52 w-16 h-8" onClick={forumnavigate}>Back</button>
      </div>  
      <div className="forum-detail-title capitalize px-4 py-0.5 border border-2">
        {forumItem && forumItem.title}
      {/* </div> */}
      </div>
        {/* 이미지 */}
        <div className="forum-detail-content">
          {forumItem && forumItem.content}
        </div>
        
        {isloggedin &&
        <div className="w-3/5 bg-red-500 flex flex-row justify-end">
          <button className="rounded-md bg-gray-300 border border-black border-2 px-2 py-1" type="reset">Back</button>
          <button className="rounded-md bg-gray-300 border border-black border-2 px-2 py-1 mx-5" type="submit">Edit</button>
        </div>
        }
    </div>
  );
}

export default ForumDetail;
