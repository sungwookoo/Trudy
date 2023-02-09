import axios from "axios";
import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import CategoryButtons from "../Filter/SelectCategory";
import UserProfile from "../Profile/UserProfile";

function Square() {
  const [squareId, setSquareId] = useState<any>(null);
  const [area, setArea] = useState<number>(1);
  const [isLocal, setIsLocal] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>();
  const [searchChange, setSearchChange] = useState<string>();
  const [squareData, setSquareData] = useState<[]>([]);

  const navigate = useNavigate();
  const navigateToUserProfile = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const authCtx = useContext(AuthContext);

  const imgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjVfMTU2/MDAxNTM3ODY1MTY5NDYx.lRYZG0121oJ0GiSZC3-rU96S2ryrM6Qs_fFZFDqPV4wg.xZ7lg9yyV1DmY2nqKatDllAcbhdvte29WOkzHGfBhr0g.GIF.z1583/3A6CE8F9-B62C-4369-AEB0-AE892D1E726E-25535-00000DD1D7B5B8D9_file.GIF?type=w800";
  };

  // 카테고리
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  // 카테고리 버튼 on/off
  const handleClick = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  console.log(selectedCategories, "카테고리");

  // 검색하고 enter 눌렀을 때
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setNameSearch(searchChange);
    }
  };

  useEffect(() => {
    const headers = {
      areaCode: area,
      isLocal: isLocal,
      gender: gender,
      name: nameSearch,
    };

    async function SquareGet() {
      const res: any = await authCtx.getUser(headers);
      setSquareData(res.data.content);
    }
    SquareGet();
  }, [area, isLocal, gender, nameSearch]);

  console.log(squareData, "스퀘어데이터");
  return (
    <div>
      {/* 검색창 */}
      <div className="">
        <CategoryButtons onClick={handleClick} selectedCategories={selectedCategories} />

        {/* isLocal 드랍박스 */}
        <select
          id="isLocal"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setIsLocal(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="1">Local</option>
          <option value="0">Tourist</option>
        </select>

        {/* gender 드랍박스 */}
        <select
          id="gender"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setGender(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* 검색 */}
        <div className="flex">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Name"
              required
              onKeyDown={pressEnter}
              onChange={(e) => {
                setSearchChange(e.target.value);
              }}
            />
            <button
              type="submit"
              className="absolute flex inset-y-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {
                setNameSearch(searchChange);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      {/* ------------------------------------------------------------------------------------------- */}

      {/* ---------------------------------------게시물--------------------------------------------------------- */}
      <div id="guidesGrid" className="p-4 grid grid-cols-3 relative">
        {squareData.map((guide: any, i) => {
          return (
            <div
              className="p-4 inline-block hover:bg-blue-800"
              key={i}
              onClick={() => {
                navigate(`/profile/${guide.id}`);
              }}
            >
              {/* 세부정보 */}
              {/* {squareId && <UserProfile key={i} userProfileId={squareId} />} */}

              <div className="md:w-1/3 inline-block float-left bg-trudy border-2 shadow-lg ">
                <img src={guide.image} alt="userThumbnail" onError={imgError} className="h-64 w-full object-cover rounded relative" />
              </div>
              <div className="md:w-2/3 md:h-full p-4 inline-block bg-trudy border-2 shadow-lg ">
                <h3 className="text-lg font-bold">{guide.name}</h3>
                <p className="text-gray-600">{guide.gender}</p>
                <p className="text-gray-600">areacode : {guide.areacode}</p>
                <p className="text-gray-600">isLocal : {guide.isLocal}</p>
                <p className="mt-2 truncate">
                  Introduce: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in aliquam magna. Integer tristique, dolor eu dignissim convallis,
                  sapien risus rhoncus neque, non bibendum lectus enim in lorem.
                  {/* {guide.introduceId.self} */}
                </p>
              </div>
            </div>
          );
        })}

        {/* {guidesList} */}
      </div>
    </div>
  );
}

export default Square;
