import "../Forum/Forum.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Forum() {
    const [postInfo, setPostInfo] = useState([]);


  useEffect(() => {
    axios.get("http://sungwoo.shop:8080/api/posts/list").then((res) => {
        setPostInfo(res.data);
    });
  }, []);
  console.log(postInfo)
  return (
    <div>
      {postInfo.map((post, i) => {
      return (
          <div className="postList">
            <h4>title: {post.title}</h4>
            <p>content: {post.content}</p>
            <p>thumbnail_image_id: {post.thumbnail_image_id}</p>
            <button onClick={()=>{
              let copy = [...postInfo];
              copy.splice(i, 1);
              setPostInfo(copy)
            }}>삭제</button>
          </div>
        );
      })}
      <br />
      <br />
      <br />
      {/* <div>{props.object.area.busan}</div> */}
    </div>
  );
}

export default Forum;