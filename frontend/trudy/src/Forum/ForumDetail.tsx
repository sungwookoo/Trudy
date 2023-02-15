import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ForumDetail.css";
import AuthContext from "../Common/authContext";
import ForumDeleteModal from "./ForumDeleteModal";
import Parser from "html-react-parser";

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
  const { id } = useParams<{ id: any }>(); // destructure the ID from useParams and specify its type
  const [forumMember, setforumMember] = useState<any>(null);
  const [forumItem, setForumItem] = useState<any>(null);
  const [forumRegion, setForumRegion] = useState<any>(null);
  const [forumCategory, setForumCategory] = useState<string[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log (loggedinId, "로그인아이디");
  const postEditnavigate = () => {
    navigate(`/post/update/${id}`);
  };

  const userProfileNavigate = () => {
    navigate(`/profile/${forumMember?.id}`);
  };

  const handleDelete = (postId: number) => {
    setIsDeleted(true);
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const [isForumLoaded, setIsForumLoaded] = useState(false);
  // const token = useSelector((state: any) => state.Auth.token);
  // const navigate = useNavigate
  // console.log(loggedinId, '로그인아이디')

  const getForumItem = async () => {
    try {
      const response = await axios.get(`/api/post/${id}`);
      setForumItem(response.data.postCombine.postElement);
      setforumMember(response.data.postCombine.memberElement);
      setForumRegion(response.data.postCombine.sigunguCodeList);
      setForumCategory(response.data.postCombine.categoryNameList.map((categoryName:any) => {
        if (categoryName === '82') {
          return 'Food';
        } else if (categoryName === '80') {
          return 'Accommodation';
        } else if (categoryName === '85') {
          return 'Festival';
        } else if (categoryName === '76') {
          return 'Attraction';
        } else if (categoryName === '75') {
          return 'Sports';
        } else if (categoryName === '78') {
          return 'Culture';
        } else if (categoryName === '79') {
          return 'Shopping';
        }
      else {
          return categoryName;
        }
      }));

      // setForumCategory(response.data.postCombine.categoryNameList);
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

  // 시간 포맷팅 해서 주기 검사후에===========

  useEffect(() => {
    getForumItem();
  }, [id]);

  if (isDeleted) {
    return null; // If the post has been deleted, don't render it
  }

  return (
    // 밑에 포럼 컨테이너 밖에 back만들어야함
    <div className="forum-detail-container">
      {/* <div className=""> */}
      <div className="flex flex-row w-4/5 ml-34 mt-8">
        {/* <button
          className="rounded-md bg-gray-300 mx-52 w-16 h-8 border border-black border-2 px-2 py-1 mb-4 hover:bg-red-400"
          onClick={forumnavigate}
        >
          Back
        </button> */}
      </div>
      {/* 이하 제목 컨텐츠 */}
      <div className="detail-box flex flex-col items-center">
        <div className="forum-detail-title capitalize px-4 border border-1">{forumItem && forumItem.title}</div>
        {/* 카테고리 */}
        <div className="flex">
          {forumCategory.map((categoryName, index) => (
          <div key={index} className="border border-1 rounded-md px-1 mx-1 bg-green-200" >
            {categoryName}
            </div>
            ))}
        </div>
            {/* 작성자, 작성 시간 */}
        <div className="forum-detail-region-category flex flex-row justify-between my-3">
          <a className="font-semibold hover: cursor-pointer" onClick={userProfileNavigate}>{forumMember?.name}</a>
          <div>{new Date(forumItem?.createdAt).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short'})}</div>
          {/* <div className="">{forumItem?.createdAt}</div> */}
        </div>
        
        <hr className="forum-detail-hr" />
        {/* 이미지 */}
        <div className="forum-detail-content px-5 pt-4 pb-8">
          {forumItem && Parser(forumItem?.content)}
          {/* {forumItem && forumItem.content} */}
        </div>

        {isloggedin && (
          <div className=" w-full flex flex-row justify-end mt-5">
            <button className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 hover:bg-red-400" onClick={handleOpenModal}>
              Delete
            </button>
            {showModal && <ForumDeleteModal postId={id} onDelete={handleDelete} onClose={handleCloseModal} />}
            <button className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 mx-2 hover:bg-orange-400" onClick={postEditnavigate}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumDetail;
