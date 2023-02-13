import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface IForumDetailProps {
  post_id: number;
  // setForumItem: (post: IgetForumResponse) => void;
}

function ForumDetail() {
  const { id } = useParams<{ id: string }>(); // destructure the ID from useParams and specify its type
  // console.log(postId, '포스트아이디')
  // const {post_id, setForumItem } = props;
  const [ForumItem, setForumItem] = useState<any>(null);
  // const [isForumLoaded, setIsForumLoaded] = useState(false);
  // const token = useSelector((state: any) => state.Auth.token);
  // const navigate = useNavigate

  useEffect(() => {
    const getForumItem = async () => {
      try {
        const response = await axios.get(`/api/post/${id}`);
        setForumItem(response.data.postCombine.postElement);
      } catch (error) {
        console.log(error);
      }
    };
    getForumItem();
  }, [id]);

  return (
    <div className="forum-detail-container bg-red-500">
      <div>
        <div className="forum-detail-title">
          {ForumItem && ForumItem.title}
          <div>
            <button type="reset">삭제</button>
            <button type="submit">수정</button>
          </div>
          <div className="forum-detail-header"></div>
        </div>
      </div>
    </div>
  );
}

export default ForumDetail;
