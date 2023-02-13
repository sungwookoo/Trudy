import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import "./Forum.css";
import ForumItem from "./ForumItem";
import axios from "axios";
import ForumSearch from "./ForumSearch";
import CategoryButtons from "../Filter/SelectCategory";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import { ThreeCircles } from "react-loader-spinner";
import ForumDetail from "./ForumDetail";

interface IgetForumResponse {
  id: number;
  member_id: number;
  title: string;
  content: string;
  thumbnail_image_id: number;
  created_at: string;
  update_at: string;
  postelement: object;
}

function ForumPage() {
  const [selectedId, setSelectedId] = useState<any>(null);
  const [forumItem, setForumItem] = useState<any>(null);

  const [forumResponse, setForumResponse] = useState<IgetForumResponse[]>([]);
  const [forumloading, setForumLoading] = useState(null);

  // 검색창
  const [word, setword] = useState<any>("");

  // 필터
  // 지역 filter
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedSigungu, setSelectedSigungu] = useState<number[]>([]);

  // 대분류 선택시 해당 대분류 id 가진 세부지역 checkbox 표시하기
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  // 카테고리 영역 추가
  const [contentTypeId, setcontentTypeId] = useState<number[]>([]);
  const handleCategoryClick = (categoryId: number) => {
    if (contentTypeId.includes(categoryId)) {
      setcontentTypeId(contentTypeId.filter((c) => c !== categoryId));
    } else {
      setcontentTypeId([...contentTypeId, categoryId]);
    }
  };

  const API_URL = "api/post";

  // 작성하기 버튼
  const navigate = useNavigate();
  const navigateToCreateArticle = () => {
    navigate("/ForumCreate");
  };

  const handleClick = (id: any) => {
    setSelectedId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axios.get(
          API_URL +
            `?area=${selectedSigungu}&contentTypeId=${contentTypeId}&word=${word}`
        );
        setForumResponse(resData.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [contentTypeId, word]);

  // 로딩 시 Spinner 띄움
  // {
  //   !forumloading && (
  //     <div>
  //       <ThreeCircles
  //         height="100"
  //         width="100"
  //         color="#4fa94d"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //         ariaLabel="three-circles-rotating"
  //         outerCircleColor=""
  //         innerCircleColor=""
  //         middleCircleColor=""
  //       />
  //     </div>
  //   );
  // }
  console.log(selectedSigungu);
  return (
    <>
      <div className="forum-page flex flex-row">
        <div className="filter-bar">
          <div className="flex">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 m-2 rounded-lg  ${
                !isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"
              }`}
            >
              Area Select
            </button>
            {!isCollapsed && (
              <AreaSelect
                key={0}
                areaCode={areaList}
                onClick={handleAreaClick}
              />
            )}
            {/* 세부지역선택 */}
            <div className="flex flex-wrap">
              {!isCollapsed &&
                selectedAreaCode &&
                sigunguList[selectedAreaCode].map(
                  (sigunguInfo: any, i: number) => (
                    <div key={i} className="flex items-center mb-2">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id={`sigungu-${sigunguInfo.id}`}
                        onChange={() => {
                          if (selectedSigungu.includes(sigunguInfo.id)) {
                            const filteredSigungu = selectedSigungu.filter(
                              (id: number) => id !== sigunguInfo.id
                            );
                            setSelectedSigungu(filteredSigungu);
                          } else {
                            setSelectedSigungu([
                              ...selectedSigungu,
                              sigunguInfo.id,
                            ]);
                          }
                        }}
                      />
                      <label htmlFor={`sigungu-${sigunguInfo.id}`}>
                        {sigunguInfo.name}
                      </label>
                    </div>
                  )
                )}
            </div>
          </div>

          <div className="cat-selectors">
            <CategoryButtons
              onClick={handleCategoryClick}
              selectedCategories={contentTypeId}
            />
          </div>

          <button
            className="border-2 border-black hover:bg-green-500 text-black font-bold py-1.5 px-4 rounded-full"
            onClick={navigateToCreateArticle}
          >
            Post Article
          </button>
        </div>
      </div>

      <div className="forum-content grid grid-cols-3 px-52 ">
        {forumResponse.map((post, i) => (
          <ForumItem key={i} post={post} onClick={() => handleClick(post.id)} />
        ))}
        {/* {selectedId && (
            <ForumDetail setForumItem={forumItem} />
          )} */}
      </div>
    </>
  );
}
export default React.memo(ForumPage);
