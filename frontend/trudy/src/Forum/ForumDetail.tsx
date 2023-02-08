import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



function ForumDetail() {
const post_id = 3
const [ForumItem, setForumItem] = useState({});
// const [isForumLoaded, setIsForumLoaded] = useState(false);
// const token = useSelector((state: any) => state.Auth.token);
// const navigate = useNavigate


useEffect(() => {
    const getForumItem = async () => {
    const data = await axios.get(`api/post/${post_id}`);
    // const 
    console.log(data.data.postCombine.postElement)
    return data;
    }
    getForumItem()
    .then(result => setForumItem(result))
    // .then(() => setIsForumLoaded(true));
}, [])

    return(
    <div>
      123
        {/* {postElem} */}
        {/* {isForumLoaded && ( */}
            <div>
                {
                  /*
                  해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
                  로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
                  board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
                  ID는 DB에 저장되어 있는 유저의 고유 번호이다.
                  */
                  // jwtUtils.isAuth(token) && jwtUtils.getId(token) === post.user.id &&
                }
                <div>
                  <button type="reset">
                    삭제
                  </button>
                  <button type="submit">
                    수정
                  </button>
                </div>
                <div className="forum-detail-header">
                  {/* <div className="board-header-username"> {board.user.username} </div> */}
                  
                </div>
            </div>
        {/* )} */}
    </div>
    )
}



export default ForumDetail;