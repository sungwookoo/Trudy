import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../Common/authContext";
import "./Comment.css";

type Props = {
  comment: any;
  index: string;
  postid: number;
  refreshComment: any;
};

function Comment({ comment, index, postid, refreshComment }: Props) {
  const [state, setState] = useState("답글 작성");
  const [nestedComment, setNestedComment] = useState("");
  const authCtx = useContext(AuthContext);
  const loggedinId = authCtx.loggedInfo.uid;
  const [commentMemberId, setCommentMemberId] = useState(null);

  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/profile/${commentMemberId}`);
  };

  useEffect(() => {
    setCommentMemberId(comment.customMemberForComment.id);
    console.log("Comment component get");
    console.log(comment, 1111);
  }, []);

  //대댓글 창 띄우기(isDeleted: 0이면 삭제된 댓글이므로 대댓글 작성 불가)
  const onClickHandlerWriteNestedComment = (isDeleted: number) => {
    if (isDeleted === 0) {
      if (state === "답글 작성") {
        setState("취소");
      } else {
        setState("답글 작성");
      }
    }
  };

  //대댓글 작성 완료
  const onClickHandlerWriteCommentComplete = (e: any, commentId: number) => {
    axios
      .post(
        `/api/post/nested-comment/${loggedinId}/${commentId}?content=${nestedComment}`
      ) //memberId 나중에 수정해야함
      .then((res) => {
        console.log("대댓글 작성 완료");
        console.log(nestedComment);
        refreshComment();
      })
      .catch((err) => {
        console.log("대댓글 작성 실패");
        console.log(err);
      });

    setNestedComment("");
    setState("답글 작성");
  };

  //대댓글 창 닫기
  const onClickHandlerWriteCommentCancel = () => {
    setNestedComment("");
    setState("답글 작성");
  };

  //댓글 or 대댓글 삭제 -> 아이디 비교해보고 삭제 버튼 나타나게 하기
  const onClickHandlerDeleteCommentForAllType = (
    e: any,
    Id: number,
    type: string,
    isDeleted: number
  ) => {
    if (isDeleted === 1) {
      alert("이미 삭제된 항목입니다!");
      return;
    }
    if (window.confirm("정말 삭제하시겠습니까?") === false) return;
    axios
      .delete(`/api/post/${type}/${Id}`)
      .then((res) => {
        console.log(`${type} 삭제 완료`);
        refreshComment();
        window.location.replace(`/post/${postid}`);
      })
      .catch((err) => {
        console.log(`${type} 삭제 실패`);
        console.log(err);
      });
  };

  //댓글 or 대댓글 좋아요
  const onClickHandlerLikeComment = (e: any, Id: number, type: string) => {
    axios
      .post(`/api/post/${type}/like/${loggedinId}/${Id}`) //memberId 나중에 수정해야함
      .then((res) => {
        console.log(`${type} 좋아요 완료`);
        refreshComment();
      })
      .catch((err) => {
        console.log(`${type} 좋아요 실패`);
        console.log(err);
      });
  };

  //대댓글 창 스타일
  const styleObj = {
    width: "500px",
    height: "32px",
    fontSize: "15px",
    border: "0",
    borderRadius: "15px",
    outline: "none",
    paddingLeft: "10px",
    backgroundColor: "rgb(233, 233, 233)",
  };

  return (
    <div>
      {/* 한개의 댓글안에 여러 대댓글을 띄우는 구조 */}
      {comment && (
        <div key={index}>
          <div
            onClick={() => onClickHandlerWriteNestedComment(comment.isDeleted)}
          >
            <div className="hover: cursor-pointer">
              <a
                className="comment-profile flex bg-red-500 hover: cursor-pointer"
                onClick={goToProfile}
              >
                <img
                  src={comment.customMemberForComment.image}
                  style={{ width: "50px", height: "50px" }}
                />
                {comment.customMemberForComment.name}
              </a>
            </div>
            <span>{comment.content}</span>
            <br />

            <div>
              {new Date(comment?.createdAt).toLocaleString("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>

            {/* (작성일자 : {comment.createdAt})<br /> */}
          </div>
          {comment.isDeleted === 0 ? (
            <div>
              {commentMemberId === loggedinId ? (
                <button
                  className="mr-2 rounded-md bg-red-500 text-white p-0.5 px-1"
                  onClick={(e) =>
                    onClickHandlerDeleteCommentForAllType(
                      e,
                      comment.id,
                      "comment",
                      comment.isDeleted
                    )
                  }
                >
                  댓글 삭제
                </button>
              ) : null}
              <button
                onClick={(e) =>
                  onClickHandlerLikeComment(e, comment.id, "comment")
                }
              >
                💚 {comment.commentLikeCount}
              </button>
            </div>
          ) : null}
          <br />
          {state === "취소" ? (
            <span>
              <input
                style={styleObj}
                onChange={(e) => setNestedComment(e.target.value)}
              ></input>
              <button
                onClick={(e) =>
                  onClickHandlerWriteCommentComplete(e, comment.id)
                }
              >
                작성 완료
              </button>{" "}
              / <button onClick={onClickHandlerWriteCommentCancel}>취소</button>
            </span>
          ) : null}
        </div>
      )}
      {comment.nestedCommentList?.map((nestedComment: any, index: string) => (
        <ol className="ml-8 my-4" key={index} style={{}}>
          <img
            src={nestedComment.customMemberForComment.image}
            style={{ width: "30px", height: "30px" }}
          />
          <span> {nestedComment.customMemberForComment.name} | </span>
          <span className="text-xl"> {nestedComment.content} </span>
          <br />
          (작성일자 : {nestedComment.createdAt})
          <br />
          {nestedComment.customMemberForComment.id === loggedinId ? (
            <button
              className="mr-2 rounded-md bg-red-500 text-white p-0.5 px-1"
              onClick={(e) =>
                onClickHandlerDeleteCommentForAllType(
                  e,
                  nestedComment.id,
                  "nested-comment",
                  0
                )
              }
            >
              대댓글 삭제
            </button>
          ) : null}
          <button
            onClick={(e) =>
              onClickHandlerLikeComment(e, nestedComment.id, "nested-comment")
            }
          >
            💚 {nestedComment.nestedCommentLikeCount}
          </button>
        </ol>
      ))}
    </div>
  );
}

export default Comment;
