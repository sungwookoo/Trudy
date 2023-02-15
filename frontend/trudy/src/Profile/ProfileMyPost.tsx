import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import "./ProfileMyPost.css";
import { useNavigate } from "react-router";


interface memberdetails {
  id: number;
}

export default function ProfileMyPost({
  post,
  memberdetails,
}: any): JSX.Element | null {
  console.log(post, "포럼포스트");
  const authCtx = useContext(AuthContext);
  const loggedinId = authCtx.loggedInfo.uid;
  const forumPostData = post;
  // const forumImageData = post.postImageElementList
  // console.log(post.postElement.thumbnailImage, "포럼이미지2");
  const forumImageData = post.thumbnailImage;
  const forumMemberData = memberdetails;
  // const forumMemberData = post.memeberElement?.id;

  const navigate = useNavigate();
  const navigateToUseritem = () => {
    navigate(`/post/${forumPostData.id}`);
  };
  // console.log(forumMemberData.id)
  console.log(loggedinId, "로그인ID");
  console.log(forumMemberData, "포럼멤버ID");
  // console.log(forumImageData, "포럼이미지");

  return (
    <div className="my-post-container flex flex-row m-4">
      <div className="my-post-item" onClick={navigateToUseritem}>
        {forumImageData ? (
          <img
            className="mypost-thumbnail-image"
            src={forumImageData}
            alt="forumthumbnail"           
          />
        ) : (
          <img
            className="mypost-thumbnail-image"
            src="http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg"
            alt="forumthumbnail"
          />
        )}
        <div className="my-post-item-title">{forumPostData.title}</div>
      </div>
    </div>
  );
}
