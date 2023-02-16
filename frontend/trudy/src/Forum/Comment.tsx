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
  const [nestedcommentMemberId, setNestedcommentMemberId] = useState(null);

  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/profile/${commentMemberId}`);
  };

  useEffect(() => {
    setCommentMemberId(comment.customMemberForComment.id);
    // setNestedcommentMemberId(comment?.nestedCommentList.customMemberForComment.id)
    console.log("Comment component get");
    console.log(comment, 1111);
  }, []);

  console.log(comment, "comment");
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
      alert("This Comment is already Deleted!");
      return;
    }
    if (window.confirm("This action will Delete the Comment") === false) return;
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
    width: "670px",
    height: "35px",
    fontSize: "15px",
    border: "0",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "rgb(233, 233, 233)",
  };

  return (
    <div>
      {/* 한개의 댓글안에 여러 대댓글을 띄우는 구조 */}
      {comment && (
        <div key={index}>
          <div>
            <div className="">
              <div className="flex">
                <div className="flex items-center">
                  <div
                    className="comment-profile flex hover: cursor-pointer"
                    onClick={goToProfile}
                  >
                    <img
                      className="comment-profile-image"
                      src={comment.customMemberForComment.image}
                    />
                    <div className="comment-profile-name">
                      {comment.customMemberForComment.name}
                    </div>
                  </div>
                  <div className="forum-comment-like-delete flex items-center">
                    <button
                      onClick={(e) =>
                        onClickHandlerLikeComment(e, comment.id, "comment")
                      }
                    >
                      <div className="mx-2">💚 {comment.commentLikeCount}</div>
                    </button>
                    {comment.isDeleted === 0 ? (
                      <div className="">
                        {commentMemberId === loggedinId ? (
                          <button
                            className="ml-2 rounded-md bg-red-500 text-white p-0.5 px-1"
                            onClick={(e) =>
                              onClickHandlerDeleteCommentForAllType(
                                e,
                                comment.id,
                                "comment",
                                comment.isDeleted
                              )
                            }
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* 댓글 */}
              <div
                className="forum-comment-content mt-2 hover: cursor-pointer"
                onClick={() =>
                  onClickHandlerWriteNestedComment(comment.isDeleted)
                }
              >
                {comment.content}
              </div>
              <div className="text-xs ml-1">
                {new Date(comment?.createdAt).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
          </div>
          {/* 이하 대댓글 작성 */}
          {state === "취소" ? (
            <div className="my-3">
              <input
                style={styleObj}
                onChange={(e) => setNestedComment(e.target.value)}
              ></input>
              <button
                className="mx-2 rounded-md bg-green-500 text-white p-0.5 px-1"
                onClick={(e) =>
                  onClickHandlerWriteCommentComplete(e, comment.id)
                }
              >
                Submit
              </button>

              <button
                className="rounded-md bg-red-500 text-white p-0.5 px-1"
                onClick={onClickHandlerWriteCommentCancel}
              >
                Cancel
              </button>
            </div>
          ) : null}
          <hr className="forum-comment-hr my-3" />
        </div>
      )}
      {comment.nestedCommentList?.map((nestedComment: any, index: string) => (
        <div
          className="nested-comment ml-8 my-2 bg-gray-100 rounded-md py-1 px-1"
          key={index}
        >
          <div className="flex items-center">
            <a
              className="comment-profile flex hover: cursor-pointer"
              href={`https://trudy.online/profile/${nestedComment.customMemberForComment.id}`}
              // onClick={goToProfile}
            >
              <img
                className="comment-profile-image"
                src={nestedComment.customMemberForComment.image}
              />
              <div className="comment-profile-name">
                {nestedComment.customMemberForComment.name}
              </div>
            </a>
            <div className="forum-nestedcomment-like-delete flex items-center">
              <button
                onClick={(e) =>
                  onClickHandlerLikeComment(
                    e,
                    nestedComment.id,
                    "nested-comment"
                  )
                }
              >
                <div className="mx-2">
                  💚 {nestedComment.nestedCommentLikeCount}
                </div>
              </button>
              {nestedComment.customMemberForComment.id === loggedinId ? (
                <button
                  className="ml-2 rounded-md bg-red-500 text-white p-0.5 px-1"
                  onClick={(e) =>
                    onClickHandlerDeleteCommentForAllType(
                      e,
                      nestedComment.id,
                      "nested-comment",
                      0
                    )
                  }
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
          <div className="forum-comment-content mt-2 hover: cursor-pointer text-xl">
            {nestedComment.content}
          </div>
          <div className="text-xs ml-1">
            {new Date(nestedComment?.createdAt).toLocaleString("en-US", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
