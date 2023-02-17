import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import "./Forum.css";
import ForumItem from "./ForumItem";
import axios from "axios";
import CategoryButtons from "../Filter/SelectCategory";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import { ThreeCircles } from "react-loader-spinner";
import ForumDetail from "./ForumDetail";
import SearchBar from "../Common/SearchBar";

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
  const [forumSize, setForumSize] = useState<number>(20);

  const [forumResponse, setForumResponse] = useState<IgetForumResponse[]>([]);
  const [forumloading, setForumLoading] = useState(null);

  // 검색창
  // 서치 바
  const [nameSearch, setNameSearch] = useState<string>("");
  const [searchChange, setSearchChange] = useState<string>("");

  // 초기화 필터
  const clearFilter = () => {
    setNameSearch("");
    setcontentTypeId([]);
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
        const resData: any = await axios.get(API_URL + `?categoryList=${contentTypeId}&title=${nameSearch}&content=${nameSearch}&size=${forumSize}`);
        setForumResponse(resData.data.content);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [contentTypeId, nameSearch, forumSize]);

  return (
    <>
      <div className="forum-page flex flex-row">
        <div className="filter-bar">
          <div className="cat-selectors font-semibold">
            <CategoryButtons onClick={handleCategoryClick} selectedCategories={contentTypeId} />
          </div>
          <div>
            <SearchBar searchChange={searchChange} setNameSearch={setNameSearch} setSearchChange={setSearchChange} />
          </div>

          <button
            className="border-2 border-black hover:bg-green-500 text-black font-bold py-2 px-2 mx-1 rounded-md shadow-md"
            onClick={navigateToCreateArticle}
          >
            Post Article
          </button>
        </div>
      </div>

      <div className="forum-content grid grid-cols-4 gap-4 mx-32">
        {forumResponse.map((post, i) => (
          <ForumItem key={i} post={post} onClick={() => handleClick(post.id)} />
        ))}
        {/* {selectedId && (
            <ForumDetail setForumItem={forumItem} />
          )} */}
      </div>
      <div className="flex justify-center ">
        <button
          onClick={() => setForumSize(forumSize + 20)}
          className={`rounded-lg bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded-full `}
        >
          See More
        </button>
      </div>
    </>
  );
}
export default React.memo(ForumPage);
