import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

interface memberdetails {
  id: number;
}

export default function ProfileMyPost({post, memberdetails}:any): JSX.Element | null {

  const forumTextData = post.postElement
  const forumImageData = post.postImageElementList
  const forumMemberData = post.memberElement
  // console.log(forumMemberData.id)
  console.log(memberdetails)
if (memberdetails === forumMemberData.id) {
  console.log('yes')
return (
  <div>
    <div className='flex justify-center'>
    {forumImageData.length != 0 ? (
    <img className='forum-thumbnail-image'
    src={forumImageData[0].url}
    alt="forum thumbnail"
    />
    ) : (
    <img
    className='forum-thumbnail-image'
    src='http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg'
    alt="forum thumbnail"
    />
    )}
    </div>
  </div>
);
} else {
  // console.log('no')
  return null;
}
}