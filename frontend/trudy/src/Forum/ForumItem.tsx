import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../Common/authContext";
import "./ForumItem.css";
import axios from "axios";
// import { dummyPost, dummyPost_images, dummyMembers } from './Forum';

interface propsTypes {
  post: Array<object>;
  title: string;
  content: string;
  created_at: string;
  image: string;
  forum_image: string;
  url: string | undefined;
  id: number;
}

// 타입 수정해주기
function ForumItem({ post }: any) {
  const forumTextData = post.postElement;
  const forumImageData = post.postImageElementList;
  const forumCreateDate = post.postElement.createdAt;
  const postmemberId = post.memberElement.id;
  const postmemberImage = post.memberElement.image;
  const postmemberName = post.memberElement.name;

  console.log(postmemberId, "작성자 ID");
  const authCtx = useContext(AuthContext);
  const loggedinId = authCtx.loggedInfo.uid;
  const token = "bearer " + localStorage.getItem("token");
  const navigate = useNavigate();
  const navigateToForumDetail = () => {
    navigate(`/post/${forumTextData.id}`);
  };

  // useEffect(() => {
  //   axios
  //     .get(`/api/member/${postmemberId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })

  //     .then((res) => {
  //       console.log(res.data, "포럼아이템");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3

  return (
    <div
      className="forum-item-box px-4 py-4 cursor-pointer hover:bg-gray-300 rounded-md"
      onClick={navigateToForumDetail}
    >
      {/* <!-- Article --> */}
      <article className="forum-item-article overflow-hidden rounded-lg shadow-lg">
        {forumImageData ? (
          <img
            className="block h-auto w-full"
            src={forumImageData[0].url}
            alt="forum thumbnail"
          />
        ) : (
          <img
            className="block h-auto w-full"
            src={
              "http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg"
            }
            alt="forum thumbnail"
          />
        )}

        <header className="flex items-center justify-between leading-tight py-4 h-20">
          <h1 className="text-2xl capitalize">
            <div className="no-underline hover:underline text-black elipsis px-3">
              {forumTextData.title}
            </div>
          </h1>
          {/* <p className="text-grey-darker text-sm">{forumCreateDate}</p> */}
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4 mb-3">
          <a
            className="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            <img
              alt="Placeholder"
              className="block rounded-full w-12 h-12"
              src={postmemberImage}
            />
            <p className="ml-2 text-md">{postmemberName}</p>
          </a>
          {/* <a
            className="no-underline text-grey-darker hover:text-red-dark"
            href="#"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a> */}
        </footer>
      </article>
      {/* <!-- END Article --> */}
    </div>

    // 밑에는 이전 디자인

    // <div className="forum-item-container" onClick={navigateToForumDetail}>
    //   {/* 포럼 아이템 개별 상자 */}
    //   <div className="forum-item-box my-2 mx-2 hover:bg-green-500">
    //     {/* Post_image 테이블 더미 */}

    //     {forumImageData ? (
    //       <img
    //         className="forum-thumbnail-image"
    //         src={forumImageData[0].url}
    //         alt="forum thumbnail"
    //       />
    //     ) : (
    //       <img
    //         className="forum-thumbnail-image"
    //         src={
    //           "http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg"
    //         }
    //         alt="forum thumbnail"
    //       />
    //     )}

    //     {/* 멤버 테이블 프로필 사진 */}

    //     {/* <img className='forum-member-image' src={post.image}></img> */}

    //     {/* Post 테이블 더미 */}
    //     <div className="forum-data-box bg-gray-100 p-1">
    //       <div className="forum-txt-title font-bold mb-1 capitalize">
    //         {forumTextData.title}
    //       </div>
    //       <div className="forum-txt-content">{forumTextData.content}</div>
    //       {/* <div>{forumTextData.created_at}</div> */}
    //     </div>
    //     <div className="forum-item-profile-box">
    //       <img
    //         className="forum-item-profile-image"
    //         src={postmemberImage}
    //         alt="memberImage"
    //       />
    //       <div className="forum-item-profile-name bg-red-500">
    //         {postmemberName}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ForumItem;
