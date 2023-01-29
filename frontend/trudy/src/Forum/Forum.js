import "../Forum/Forum.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Forum(props) {
  return (
  <div className="allPostList">
    {props.postInfo.map((post, i) => {
      return (
      <div className="postList">
        <h4>title: {post.title}</h4>
        <p>content: {post.content}</p>
        <img src={post.thumbnailImageUrl} />
        <button onClick={()=>{
          let copy = [...props.postInfo];
          copy.splice(i, 1);
          props.setPostInfo(copy)
          }}>삭제</button>
      </div>
      );
      })}
    </div>
  );
}

export default Forum;