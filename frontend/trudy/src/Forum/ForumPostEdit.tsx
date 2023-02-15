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

  const navigate = useNavigate();
  const backToPost = () => {
    navigate(-1);
  };

  const token = "bearer " + localStorage.getItem("token");
  // console.log(id, "포스트아이디");

  // const getpostData = async () => {
  //   try {
  //     const forumResponse = await axios.get(`/api/post/${id}`).then (
  //     setPostData(forumResponse.data.postCombine.postElement);
  //     setPostMemberData(forumResponse.data.postCombine.memberElement);
  //     setPostRegionData(forumResponse.data.postCombine.sigunguCodeList);
  //     setPostCategoryData(forumResponse.data.postCombine.categoryNameList);
  //     // console.log(postData, "포스트데이터");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axiosInstance.get(`/api/post/${id}`).then((res) => {
          setPostData(res.data.postCombine.postElement);
          setPostMemberData(res.data.postCombine.memberElement);
          setPostRegionData(res.data.postCombine.sigunguCodeList);
          setPostCategoryData(res.data.postCombine.categoryNameList);
          setTitle(res.data.postCombine.postElement.title)
          setEditPost(res.data.postCombine.postElement.content);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // 필터 값 바뀌면 limit 값 변경해주기
  }, []);
  console.log(editPost, 333333333);
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
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const imagedata = new FormData();
          loader.file.then((file: any) => {
            imagedata.append("name", file.name);
            imagedata.append("upload", file);
            console.log(file.name)
            console.log(imagedata.get("upload"));

            axiosInstance.post("/api/post", imagedata).then((res: any) => {
              alert("이미지 업로드 완료!");
              // setImage(res.data.filename);
              console.log(res.data.file.name);
            });
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
        <textarea className="forum-detail-edit-title capitalize px-6 border-2"
        value={title}
        onChange={handleTitleChange}
        >
        </textarea>
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
            className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 hover:bg-red-400"
            // onClick={handleOpenModal}
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
