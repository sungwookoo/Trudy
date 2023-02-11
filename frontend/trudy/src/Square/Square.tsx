import axios from "axios";
import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import UserProfile from "../Profile/UserProfile";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import { transform } from "typescript";

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

  // 지역필터
  const [areaCode, setAreaCode] = useState<number>(0);
  const [sigunguCode, setSigunguCode] = useState<number>(0);

  // 지역 filter
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  const authCtx = useContext(AuthContext);

  const imgURL =
    "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjVfMTU2/MDAxNTM3ODY1MTY5NDYx.lRYZG0121oJ0GiSZC3-rU96S2ryrM6Qs_fFZFDqPV4wg.xZ7lg9yyV1DmY2nqKatDllAcbhdvte29WOkzHGfBhr0g.GIF.z1583/3A6CE8F9-B62C-4369-AEB0-AE892D1E726E-25535-00000DD1D7B5B8D9_file.GIF?type=w800";

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
    <div className="">
      {/* 검색창 */}
      <div className="border-2 flex flex-row justify-center justify-evenly px-12 py-1">
        {/* isLocal (UserType) 드랍박스 */}
        <div className="flex flex-row justify-center mx-24  w-1/4  ml-96">
          <select
            className="justify-center w-2/3 rounded-md border-gray-500 shadow-sm px-2 py-2 mr-12 "
            id="isLocal"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setIsLocal(e.target.value);
            }}
          >
            <option value="">UserType</option>
            <option value="1">Local</option>
            <option value="0">Tourist</option>
          </select>

          {/* gender 드랍박스 */}
          <select
            className="justify-center w-2/3 rounded-md border-gray-500 shadow-sm px-2 py-2 "
            id="gender"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setGender(e.target.value);
            }}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* 검색 */}
        <div className="flex flex-row justify-center w-1/4">
          <input
            type="search"
            id="default-search"
            className="block p-3 w-3/5 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Search Name"
            required
            onKeyDown={pressEnter}
            onChange={(e) => {
              setSearchChange(e.target.value);
            }}
          />
          <button
            type="submit"
            className="flex inset-y-0 right-0 p-3 text-sm font-medium bg-white rounded-md border hover:bg-green-700 ml-4 border-gray-500 shadow-sm"
            onClick={(e) => {
              setNameSearch(searchChange);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <>
        <div className="bg-yellow-500 flex flex-row">
          <AreaSelect areaCode={areaList} onClick={handleAreaClick} />
          {selectedAreaCode && (
            <div className="flex flex-row flex-wrap mx-2">
              {sigunguList[selectedAreaCode].map((sigunguInfo: any, i: number) => (
                <div key={i} className="flex items-center h-1/5 my-1">
                  <input
                    className="ml-3 mr-1"
                    name="sigungu-select"
                    type="radio"
                    id={`sigungu-${sigunguInfo.id}`}
                    checked={sigunguCode === sigunguInfo.id}
                    onChange={() => setSigunguCode(sigunguInfo.id)}
                  />
                  <label htmlFor={`sigungu-${sigunguInfo.id}`}>{sigunguInfo.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </>

      <br />
      <br />
      {/* ------------------------------------------------------------------------------------------- */}

      {/* ---------------------------------------게시물--------------------------------------------------------- */}
      <div id="guidesGrid" className="p-4 grid grid-cols-3 relative">
        {squareData.map((guide: any, i) => {
          return (
            <>
              {authCtx.loggedEmail !== guide.email ? (
                <div
                  className="mx-1 p-1 inline-block hover:bg-green-500"
                  key={i}
                  onClick={() => {
                    navigate(`/profile/${guide.id}`);
                  }}
                >
                  {/* 세부정보 */}
                  {/* {squareId && <UserProfile key={i} userProfileId={squareId} />} */}

                  <div className="md:w-1/3 inline-block float-left bg-trudy border-2 shadow-lg ">
                    {guide.img ? (
                      <img
                        src={guide.img}
                        alt="userThumbnail"
                        className="h-64 w-full object-cover rounded relative"
                      />
                    ) : (
                      <img
                        src={imgURL}
                        alt="userThumbnail"
                        className="h-64 w-full object-cover rounded relative"
                      />
                    )}
                  </div>
                  <div className="md:w-2/3 md:h-full p-4 inline-block bg-trudy border-2 shadow-lg ">
                    <h3 className="text-lg font-bold">{guide.name}</h3>
                    <p className="text-gray-600">{guide.gender}</p>
                    <p className="text-gray-600">areacode : {guide.areacode}</p>
                    <p className="text-gray-600">isLocal : {guide.isLocal}</p>
                    <p className="mt-2 truncate">{guide.introduceId.self}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}

        {/* {guidesList} */}
      </div>
    </div>
  );
}

export default Square;
