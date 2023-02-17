import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import "./ForumCreate.css";
// import Editor from './Editor';
import CategoryButtons from "../Filter/SelectCategory";

import parse from "html-react-parser";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import "./CkEditor.css";
import axiosInstance from "../Common/axiosInterceptor";

function ForumCreate() {
  const authCtx = useContext(AuthContext);
  const loggedinId = authCtx.loggedInfo.uid;
  const [forumtitle, setforumTitle] = useState("");
  const [forumcontent, setforumContent] = useState("");
  const [forumcategory, setForumCategory] = useState<number[]>([]);
  const [forummember, setMember] = useState(null);
  const [forumsigun, setSigun] = useState(null);
  const [forumimage, setImage] = useState(undefined);
  const [flag, setFlag] = useState(false);
  const [flagImage, setFlagImage] = useState("");

  const [saveFileNameArr, setSaveFileNameArr] = useState([""]);

  const token = "bearer " + localStorage.getItem("token");
  // const [forumupload, setUpload] = useState(null);
  // const [viewContent, setViewContent] = useState([]);

  const navigates = useNavigate();
  const cancelPosts = () => {
    removeImageArr();
    navigates("/Forum");
  };
  const returnToForum = () => {
    navigates("/Forum");
  };
  //============================================================================useEffect start===============================================
  //useEffect 에 이미지를 sessionStorage에 저장
  useEffect(() => {
    console.log("saveFileNameArr감시 useEffect - saveFileNameArr sessionStorage 저장 값보기 : ", saveFileNameArr);
    sessionStorage.setItem("saveFileNameArr", JSON.stringify(saveFileNameArr));
    console.log("sessionStorage에서 가져온 결과 : ");
    console.log(JSON.parse(sessionStorage.getItem("saveFileNameArr") || "[]"));
  }, [saveFileNameArr]);

  //====================useEffect end==========================
  // 페이지 이동 시 경고창1안
  window.addEventListener("beforeunload", (event) => {
    console.log("3. eventListner 반응1 ");
    console.log(event);

    event.preventDefault();
    event.returnValue = "Are you sure you want to leave? Your post will be lost.";

    console.log(event);

    console.log("이벤트 발생 beforeunload");
    //console.log(event);
    // 삭제 함수
    if (saveFileNameArr.length > 1) {
      console.log("if 삭제 함수 실행");
      // 맨 앞에 공백을 제거해줌
      saveFileNameArr.shift();

      axiosInstance
        .delete(`/api/post/upload?saveFileNameArr=${saveFileNameArr}`)
        .then((res) => {
          console.log(saveFileNameArr, 111111);
          console.log("eventListner axios 사진 삭제 성공");
          console.log(`/api/post/upload?saveFileNameArr=${saveFileNameArr}`);
        })
        .catch((err) => {
          console.log(" eventListner axios 사진 삭제 실패");
          console.log(`/api/post/upload?saveFileNameArr=${saveFileNameArr}`);
        });
    }
  });

  const forumdata = {
    title: forumtitle,
    content: forumcontent,
    sigunguIdList: [],
    memberId: loggedinId,
    categoryList: forumcategory,
    thumbnailImage: flagImage,
  };
  // 카테고리 버튼 on/off
  const handleCategoryClick = (categoryId: number) => {
    if (forumcategory.includes(categoryId)) {
      setForumCategory(forumcategory.filter((c) => c !== categoryId));
    } else {
      setForumCategory([...forumcategory, categoryId]);
    }
  };
  console.log(forumcategory);
  const customUploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const upload = new FormData();
          loader.file.then((file: any) => {
            if (file.size > 1024 * 1024 * 100) {
              reject("Only images smaller than 10MB can be uploaded");
            } else {
              upload.append("upload", file);
              axios
                .post("api/post/upload", upload)
                .then((res: any) => {
                  console.log("사진 업로드 성공");
                  console.log(file);
                  console.log("res 결과 보기");
                  console.log(res.data);

                  if (!flag) {
                    setFlag(true);
                    setFlagImage(res.data.imageUrl);
                  }

                  resolve({
                    default: `${res.data.imageUrl}`,
                  });

                  setSaveFileNameArr((prev) => [...prev, `${res.data.fileName}`]);
                })
                .catch((err) => {
                  console.log(err, "사진 업로드 실패");
                  reject(err);
                });
            }
          });
        });
      },
      abort() {
        console.log("파일 업로드 중단");
      },
    };
  };

  const submitPost = () => {
    axiosInstance
      .post("/api/post", forumdata)
      .then((res) => {
        alert("Post Successful!");
        console.log(res);
        returnToForum();
      })
      .catch((err) => {
        console.log(err);
        alert("Make Sure to add Titles and Content!");
      });
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return customUploadAdapter(loader);
    };
  }

  //useEffect ->sessionStorage에서 list를 가져옴 -> return 으로 파일 전체 삭제
  const removeImageArr = () => {
    let deleteFileNameArr = JSON.parse(sessionStorage.getItem("saveFileNameArr") || "[]");

    console.log("removeImageArr 함수 - 페이지 이동 useEffect return 실행 / from sessionStorage saveFileNameArr", deleteFileNameArr);

    if (deleteFileNameArr.length > 1) {
      deleteFileNameArr.shift();
      console.log("useEffect return if 실행 /다음건 삭제할 파일명", deleteFileNameArr);

      axios
        .delete(`/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`)
        .then((res) => {
          console.log("eventListner axios 사진 삭제 성공");
          console.log(`/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`);
        })
        .catch((err) => {
          console.log(" eventListner axios 사진 삭제 실패");
          console.log(`/api/post/upload?deleteFileNameArr=${deleteFileNameArr}`);
        });
    }
  };

  return (
    <>
      <div className="forum-create-container px-96">
        <div className="flex flex-row">
          <CategoryButtons onClick={handleCategoryClick} selectedCategories={forumcategory} />
        </div>
        <div className="forum-title-container">
          <input className="forum-title" type="text" placeholder="Enter Title Here!" onChange={(event) => setforumTitle(event.target.value)} />
        </div>
        <div className="forum-text-editor">
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "Drag, drop or copy & paste to upload image! ",
              extraPlugins: [uploadPlugin],
            }}
            data={forumcontent}
            onReady={(editor: any) => {
              // console.log('Editor is ready to use!', editor);
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setforumContent(data);
              console.log({ data });
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
        {loggedinId && (
          <div className="flex flex-row w-full justify-end px-44">
            <button
              className="border-2 border-black hover:bg-red-400 font-bold py-1 px-4 mx-2 rounded-full"
              onClick={cancelPosts}
            >
              Back
            </button>
            <button
              className="border-2 border-black hover:bg-green-400 font-bold py-1 px-4 mx-2 rounded-full"
              onClick={submitPost}
            >
              Submit
            </button>
          </div>
        )}
        {/* <ForumImageUpload /> */}

        {/* <Images /> */}
      </div>
    </>
  );
}

export default ForumCreate;
