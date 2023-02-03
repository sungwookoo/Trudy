import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import "./Square.css";

function Square() {
  const [area, setArea] = useState<number>(1);
  const [isLocal, setIsLocal] = useState<number>(1);
  const [gender, setGender] = useState<string>("All");
  const [nameSearch, setNameSearch] = useState<string>();
  const [searchChange, setSearchChange] = useState<string>();
  const [squareData, setSquareData] = useState<[]>([]);



  // 더미데이터
  // const tempData = [
  //   {
  //     image:
  //       "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/01/22/j0CUgPfqy6Fn637784817551514147.jpg",
  //     nickname: "윈터",
  //     isLocal: "유저타입",
  //     gender: "성별",
  //     area: "지역",
  //     introduce: "소개글",
  //   },
  //   {
  //     image:
  //       "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjVfMTU2/MDAxNTM3ODY1MTY5NDYx.lRYZG0121oJ0GiSZC3-rU96S2ryrM6Qs_fFZFDqPV4wg.xZ7lg9yyV1DmY2nqKatDllAcbhdvte29WOkzHGfBhr0g.GIF.z1583/3A6CE8F9-B62C-4369-AEB0-AE892D1E726E-25535-00000DD1D7B5B8D9_file.GIF?type=w800",
  //     nickname: "쯔위",
  //     isLocal: "유저타입",
  //     gender: "성별",
  //     area: "지역",
  //     introduce: "소개글",
  //   },
  //   {
  //     image:
  //       "http://sports.hankooki.com/news/photo/202210/6808890_990617_216.jpg",
  //     nickname: "카리나",
  //     isLocal: "유저타입",
  //     gender: "성별",
  //     area: "지역",
  //     introduce: "소개글",
  //   },
  //   {
  //     image:
  //       "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/01/22/j0CUgPfqy6Fn637784817551514147.jpg",
  //     nickname: "윈터",
  //     isLocal: "유저타입",
  //     gender: "성별",
  //     area: "지역",
  //     introduce: "소개글",
  //   },
  //   {
  //     image:
  //       "http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2019/08/02/02a7e664-bc25-488d-9690-9d79b3395d6b.jpg",
  //     nickname: "권나라",
  //     isLocal: "유저타입",
  //     gender: "성별",
  //     area: "지역",
  //     introduce: "소개글",
  //   },
  // ];

  // const guidesList = tempData.map((guide) => {
  //   return (
  //     <div className="bg-trudy border-2 shadow-lg p-6 inline-block">
  //       <div className="md:w-1/3 inline-block float-left">
  //         <img
  //           src={guide.image}
  //           alt="Article Image"
  //           className="h-64 w-full object-cover rounded relative"
  //         />
  //       </div>
  //       <div className="md:w-2/3 md:h-full p-4 bg-yellow-300 inline-block">
  //         <h3 className="text-lg font-bold">{guide.nickname}</h3>
  //         <p className="text-gray-600">Gender</p>
  //         <p className="text-gray-600">Region</p>
  //         <p className="text-gray-600">isLocal</p>
  //         <p className="mt-2 truncate">
  //           Introduce: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //           Sed in aliquam magna. Integer tristique, dolor eu dignissim
  //           convallis, sapien risus rhoncus neque, non bibendum lectus enim in
  //           lorem.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // });

  const imgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjVfMTU2/MDAxNTM3ODY1MTY5NDYx.lRYZG0121oJ0GiSZC3-rU96S2ryrM6Qs_fFZFDqPV4wg.xZ7lg9yyV1DmY2nqKatDllAcbhdvte29WOkzHGfBhr0g.GIF.z1583/3A6CE8F9-B62C-4369-AEB0-AE892D1E726E-25535-00000DD1D7B5B8D9_file.GIF?type=w800";
  };

  // 검색하고 enter 눌렀을 때
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Enter") {
      setNameSearch(searchChange);
    }
  };


  useEffect(() => {
    // const params = {
    //   area: area,
    //   isLocal: isLocal,
    //   gender: gender,
    //   name: nameSearch,
    // };
    async function SquareGet() {
      await axios.get("api/member/").then((response) => {
        setSquareData(response.data.data);
        console.log(response.data);
      });
    }
    SquareGet();
  }, [area, isLocal, gender, nameSearch]);

  return (
    <div>
      {/* 검색창 */}
      <div className="">
        <div id="regionSelect" className="float-left">
          <div id="">
            <label>
              <input type="checkbox" id="seoul" name="" />
              서울
            </label>
            <label>
              <input type="checkbox" id="busan" name="" />
              부산
            </label>
          </div>
          <div id="regionDetail" className="">
            <input type="checkbox" id="regionDetail" name="regionDetail" />
          </div>
        </div>

        {/* isLocal 드랍박스 */}
        <select
          id="isLocal"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setIsLocal(parseInt(e.target.value));
          }}
        >
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
          <option value="all">all</option>
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />

      {/* 게시물 */}
      <div id="guidesGrid" className="p-4 grid grid-cols-3 relative">
        {squareData.map((guide: { image: string; name: string }, i) => {
          return (
            <div
              className="bg-trudy border-2 shadow-lg p-6 inline-block"
              key={i}
              // onclick="프로필 페이지 이동"
            >
              <div className="md:w-1/3 inline-block float-left">
                <img
                  src={guide.image}
                  onError={imgError}
                  className="h-64 w-full object-cover rounded relative"
                />
              </div>
              <div className="md:w-2/3 md:h-full p-4 bg-yellow-300 inline-block">
                <h3 className="text-lg font-bold">{guide.name}</h3>
                <p className="text-gray-600">Gender</p>
                <p className="text-gray-600">Region</p>
                <p className="text-gray-600">isLocal</p>
                <p className="mt-2 truncate">
                  Introduce: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Sed in aliquam magna. Integer tristique, dolor eu
                  dignissim convallis, sapien risus rhoncus neque, non bibendum
                  lectus enim in lorem.
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
