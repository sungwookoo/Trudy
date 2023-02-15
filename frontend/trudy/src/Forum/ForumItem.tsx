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
  const forumImageData = post.postElement.thumbnailImage;
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
  
  return (
    <div className="forum-item-box px-4 py-4 cursor-pointer hover:bg-gray-300 rounded-md" onClick={navigateToForumDetail}>
      {/* <!-- Article --> */}
      <article className="forum-item-article overflow-hidden rounded-lg shadow-lg">
        {forumImageData ? (
          <img className="forum-item-thumbnail-image block h-auto w-full" src={forumImageData} alt="forum thumbnail" />
        ) : (
          <img className="block h-auto w-full" src={"http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg"} alt="forum thumbnail" />
        )}

        <header className="flex items-center justify-between leading-tight py-4 h-20">
          <h1 className="text-2xl capitalize">
            <div className="no-underline hover:underline text-black elipsis px-3">{forumTextData.title}</div>
          </h1>
          {/* <p className="text-grey-darker text-sm">{forumCreateDate}</p> */}
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4 mb-3">
          <a className="flex items-center no-underline hover:underline text-black" href="#">
            <img alt="Placeholder" className="block rounded-full w-12 h-12" src={postmemberImage} />
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
  );
}

export default ForumItem;
