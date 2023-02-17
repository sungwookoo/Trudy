import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CkEditor.css";
import "./ForumPostEdit.css";
import axiosInstance from "../Common/axiosInterceptor";

function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<any>(null);
  const [postMemberData, setPostMemberData] = useState<any>(null);
  const [postRegionData, setPostRegionData] = useState<any>(null);
  const [postCategoryData, setPostCategoryData] = useState<any>(null);
  const [editPost, setEditPost] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [saveFileNameArr, setSaveFileNameArr] = useState([""]);

  //수정함=======================
  //========================useEffect start================================
  //[back 버튼 클릭 시 사진 삭제준비]useEffect 에 이미지 이름을 sessionStorage에 저장
  useEffect(() => {
    console.log(
      "saveFileNameArr감시 useEffect - saveFileNameArr sessionStorage 저장 값보기 : ",
      saveFileNameArr
    );
    sessionStorage.setItem("saveFileNameArr", JSON.stringify(saveFileNameArr));
    console.log("sessionStorage에서 가져온 결과 : ");
    console.log(JSON.parse(sessionStorage.getItem("saveFileNameArr") || "[]"));
  }, [saveFileNameArr]);

  //====================useEffect end==========================

  const navigate = useNavigate();
  const cancelToPost = () => {
    removeImageArr();
    navigate(-1);
  };
  const backToPost = () => {
    navigate(-1);
  };

  const token = "bearer " + localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axiosInstance
          .get(`/api/post/${id}`)
          .then((res) => {
            setPostData(res.data.postCombine.postElement);
            setPostMemberData(res.data.postCombine.memberElement);
            setPostRegionData(res.data.postCombine.sigunguCodeList);
            setPostCategoryData(res.data.postCombine.categoryNameList);
            setTitle(res.data.postCombine.postElement.title);
            setEditPost(res.data.postCombine.postElement.content);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // 필터 값 바뀌면 limit 값 변경해주기
  }, []);
  console.log(editPost, 33333);
  const handleEditPost = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/api/post/${id}`,
        {
          title: title,
          content: editPost,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setEditPost(response.data);
      backToPost();
    } catch (error) {
      console.error(error);
    }
  };

  const customUploadAdapter = (loader: any) => {
    //수정함=======================
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const upload = new FormData();
          loader.file.then((file: any) => {
            if (file.size > 1024 * 1024 * 50) {
              reject("Only images smaller than 10MB can be uploaded");
            } else {
              upload.append("upload", file);
              axios
                .post("/api/post/upload", upload)
                .then((res: any) => {
                  console.log("사진 업로드 성공");
                  console.log(file);
                  console.log("res 결과 보기");
                  console.log(res.data);

                  resolve({
                    default: `${res.data.imageUrl}`,
                  });

                  setSaveFileNameArr((prev) => [
                    ...prev,
                    `${res.data.fileName}`,
                  ]);
                })
                .catch((err) => {
                  console.log("사진 업로드 실패");
                  reject(err);
                });
            }
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return customUploadAdapter(loader);
    };
  }

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  //이미지 삭제 함수 ->sessionStorage에서 list를 가져옴 -> return 으로 파일 전체 삭제
  const removeImageArr = () => {
    let deleteFileNameArr = JSON.parse(
      sessionStorage.getItem("saveFileNameArr") || "[]"
    );

    console.log(
      "removeImageArr 함수 - 페이지 이동 useEffect return 실행 / from sessionStorage saveFileNameArr",
      deleteFileNameArr
    );

    if (deleteFileNameArr.length > 1) {
      deleteFileNameArr.shift();
      console.log(
        "useEffect return if 실행 /다음건 삭제할 파일명",
        deleteFileNameArr
      );

      axios
        .delete(`/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`)
        .then((res) => {
          console.log("eventListner axios 사진 삭제 성공");
          console.log(
            `/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`
          );
          backToPost();
        })
        .catch((err) => {
          console.log(" eventListner axios 사진 삭제 실패");
          console.log(
            `/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`
          );
        });
    }
  };

  return (
    // 밑에 포럼 컨테이너 밖에 back만들어야함
    <div className="forum-detail-container">
      {/* <div className=""> */}
      <div className="flex flex-row w-4/5 ml-34 mt-8">
        {/* <button
          className="rounded-md bg-gray-300 mx-52 w-16 h-8 border border-black border-2 px-2 py-1 mb-4 hover:bg-red-400"
          onClick={forumnavigate}
        >
          Back
        </button> */}
      </div>
      {/* 이하 제목 컨텐츠 */}
      <div className="detail-box flex flex-col items-center">
        <textarea
          className="forum-detail-edit-title capitalize px-6 border border-2"
          value={title}
          onChange={handleTitleChange}
        ></textarea>
        <div className="forum-detail-region-category flex flex-row justify-between my-3 w-1/4">
          <div>Region: {postRegionData}</div>
          <div>Category: {postCategoryData}</div>
        </div>
        {/* 이미지 */}

        <div className="forum-detail-content px-5 pt-4 pb-8">
          <div className="forum-text-editor">
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "Drag, drop or copy & paste to upload image! ",
                extraPlugins: [uploadPlugin],
              }}
              data={editPost}
              onReady={(editor: any) => {
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                // setImage(data);
                setEditPost(data);
                //
                console.log({ data });
              }}
              onBlur={(event: any, editor: any) => {
                // console.log('Blur.', editor);
              }}
              onFocus={(event: any, editor: any) => {
                // console.log('Focus.', editor);
              }}
            />
          </div>
          {/* {postData?.content} */}
        </div>

        {/* {isloggedin && ( */}
        <div className=" w-full flex flex-row justify-end mt-5">
          <button
            className="rounded-md bg-gray-300 border border-black border-2 px-2 py-1 hover:bg-red-400"
            onClick={cancelToPost}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 mx-2 hover:bg-green-400"
            onClick={handleEditPost}
          >
            Submit Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;
