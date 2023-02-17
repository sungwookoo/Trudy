import axios from "axios";
import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import UserProfile from "../Profile/UserProfile";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import { transform } from "typescript";
import "./Square.css";
import Sns from "../Profile/Sns";

function Square() {
  const [squareId, setSquareId] = useState<any>(null);
  const [area, setArea] = useState<number[]>([]);
  const [isLocal, setIsLocal] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>();
  const [searchChange, setSearchChange] = useState<string>();
  const [squareData, setSquareData] = useState<[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [image, setImage] = useState<string>();

  const navigate = useNavigate();
  const navigateToUserProfile = (id: number) => {
    navigate(`/profile/${id}`);
  };
  // 지역필터
  const [areaCode, setAreaCode] = useState<number>();
  const [sigunguCode, setSigunguCode] = useState<number>();

  // 지역 filter
  const handleAreaClick = (id: number) => {
    setAreaCode(id);
  };

  const authCtx = useContext(AuthContext);
  const imgURL =
    "https://memorableindia.com/blog/wp-content/uploads/2017/11/Frequent-Traveler-Successful.jpg";
  // "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjVfMTU2/MDAxNTM3ODY1MTY5NDYx.lRYZG0121oJ0GiSZC3-rU96S2ryrM6Qs_fFZFDqPV4wg.xZ7lg9yyV1DmY2nqKatDllAcbhdvte29WOkzHGfBhr0g.GIF.z1583/3A6CE8F9-B62C-4369-AEB0-AE892D1E726E-25535-00000DD1D7B5B8D9_file.GIF?type=w800";

  // 검색하고 enter 눌렀을 때
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setNameSearch(searchChange);
    }
  };

  useEffect(() => {
    const params = {
      areaCode: areaCode,
      isLocal: isLocal,
      gender: gender,
      name: nameSearch,
      size: 500
    };

    async function SquareGet() {
      const res: any = await authCtx.getUser(params);
      console.log(params);
      console.log(res.data.content);
      setSquareData(res.data.content);
    }
    SquareGet();
  }, [areaCode, isLocal, gender, nameSearch]);
  return (
    <div className="grid grid-rows-2 gap-4">
      {/* 검색창 */}
      <div className="border-b-2 flex flex-row py-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 m-2 rounded-lg  ${
            !isCollapsed ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          Area Select
        </button>
        {/* isLocal (UserType) 드랍박스 */}
        <div className="flex flex-row mx-24  w-1/4  ml-96">
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
            className="block p-3 w-3/5 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 shadow-sm"
            placeholder="Search Name"
            required
            onKeyDown={pressEnter}
            onChange={(e) => {
              setSearchChange(e.target.value);
            }}
          />
          <button
            type="submit"
            className="flex inset-y-0 right-0 p-3 text-sm font-medium bg-white rounded-md border hover:bg-green-500 ml-4 border-gray-500 shadow-sm"
            onClick={(e) => {
              setNameSearch(searchChange);
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* ==================================================지역 필터====================================================== */}
      {!isCollapsed && (
        <>
          <div className="border border-gray-500">
            <AreaSelect key={10} areaCode={areaList} onClick={handleAreaClick} />
          </div>

          {areaCode && (
            <div className="flex flex-wrap">
              {sigunguList[areaCode].map((sigunguInfo: any, i: number) => (
                <div key={i} className="flex items-center mb-2 inline-block bg-trudy rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  <input
                    className="mr-2"
                    name="sigungu-select"
                    type="radio"
                    id={`sigungu-${sigunguInfo.id}`}
                    checked={sigunguCode === sigunguInfo.id}
                    onChange={() => setSigunguCode(sigunguInfo.id)}
                  />
                  <label htmlFor={`sigungu-${sigunguInfo.id}`}>
                    {sigunguInfo.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <br />
      <br />
      {/* ------------------------------------------------------------------------------------------- */}

      {/* ---------------------------------------게시물--------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-0 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:px-2 lg:py-2 shadow-lg">
          {squareData.map((guide: any, i) => {
            return (
              <>
                {authCtx.loggedInfo.uid !== guide.id ? (
                  <div
                    key={i}
                    className="w-full bg-slate-100 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-lg"
                    onClick={() => {
                      navigate(`/profile/${guide.id}`);
                    }}
                  >
                    {/* 세부정보 */}
                    {/* {squareId && <UserProfile key={i} userProfileId={squareId} />} */}

                    <div className="w-full md:w-2/5 h-80">
                      {guide.image ? (
                        <img
                          src={guide.image}
                          alt="userThumbnail"
                          className="object-center object-cover w-full h-full"
                        />
                      ) : (
                        <img
                          src={imgURL}
                          alt="userThumbnail"
                          className="object-center object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
                      <p className="text-3xl text-gray-700 font-bold">
                        {guide.name}
                      </p>
                      {guide.areaCode == null ? (
                        <p className="text-2xl text-gray-400 font-normal">
                          Tourist
                        </p>
                      ) : (
                        <p className="text-2xl text-gray-400 font-normal">
                          {guide.areaCode &&
                            areaList.map((area) => {
                              if (area.id === guide.areaCode) {
                                return area.name;
                              }
                            })}
                          ,{" "}
                          {guide.sigunguCode &&
                            sigunguList[guide.areaCode].map((sigungu: any) => {
                              if (sigungu.id === guide.sigunguCode) {
                                return sigungu.name;
                              }
                            })}
                          {/* {guide.areaCode} */}
                        </p>
                      )}
                      <p className="text-xl leading-relaxed text-gray-500 font-normal">
                        {guide.introduceId.self}
                      </p>
                      <Sns
                        Facebook={guide.introduceId.facebook}
                        Instagram={guide.introduceId.instagram}
                        Twitter={guide.introduceId.twitter}
                        Github={guide.introduceId.github}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ); // 여기가 return 끝
          })}

          {/* {guidesList} */}
        </div>
      </section>
    </div>
  );
}

export default Square;
