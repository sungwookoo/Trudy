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

function Square() {
  const [squareId, setSquareId] = useState<any>(null);
  const [area, setArea] = useState<number>(1);
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
  console.log(squareData, "squareData");
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
    };

    async function SquareGet() {
      const res: any = await authCtx.getUser(params);
      setSquareData(res.data.content);
    }
    SquareGet();
  }, [areaCode, isLocal, gender, nameSearch]);
  console.log(areaCode);
  return (
    <div className="grid grid-rows-2 gap-4">
      {/* 검색창 */}
      <div className="border-b-2 flex flex-row py-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 m-2 rounded-lg  ${
            !isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"
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
            <AreaSelect key={0} areaCode={areaList} onClick={handleAreaClick} />
          </div>
          <br />
          {areaCode && (
            <div className="flex flex-wrap">
              {sigunguList[areaCode].map((sigunguInfo: any, i: number) => (
                <div key={i} className="flex items-center mb-2">
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
                    className="w-full bg-slate-100 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-lg"
                    key={i}
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
                      <p className="text-2xl text-gray-400 font-normal">
                        {/* areacode : {areaList.filter(area => area.id === guide.areaCode)} */}
                      </p>
                      <p className="text-xl leading-relaxed text-gray-500 font-normal">
                        {guide.introduceId.self}
                      </p>
                      <div className="flex justify-start space-x-2">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
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
