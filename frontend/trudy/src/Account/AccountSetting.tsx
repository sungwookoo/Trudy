import { SyntheticEvent, useState, useEffect, useContext } from "react";
import AuthContext from "../Common/authContext";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// 로그인 페이지

function AccountSetting() {
  const [data, setData] = useState<any>(null);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  function navigateToAccountEdit() {
    navigate("/accountedit");
  }
  function navigateToPasswordChange() {
    navigate("/passwordchange");
  }

  useEffect(() => {
    async function MyData() {
      const response: any = await authCtx.getMyData();
      if (response !== null) {
        setData(response.data);
      }
    }
    MyData();
  }, []);
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>

        <div className="-space-y-px rounded-md shadow-md">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              disabled
              className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={data ? data.email : ""}
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Email
            </label>
          </div>
        </div>

        <form className="mt-8 space-y-6" action="/api/member" method="POST">
          {/* 닉네임 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="nickname"
                disabled
                defaultValue={data ? data.name : ""}
                className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nickname
              </label>
            </div>
          </div>

          {/* 성별 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="gender"
                name="gender"
                type="text"
                autoComplete="gender"
                disabled
                defaultValue={data ? data.gender : ""}
                className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="gender"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Gender
              </label>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="birth"
                name="birth"
                type="text"
                autoComplete="birth"
                disabled
                defaultValue={data ? data.birth : ""}
                className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="birth"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Birth
              </label>
            </div>
          </div>

          {/* 로컬여부 */}
          {data ? (
            data.isLocal === "1" ? (
              <div className="">
                <div className="relative -space-y-px rounded-md shadow-md">
                  <input
                    id="local"
                    name="local"
                    type="text"
                    autoComplete="local"
                    disabled
                    defaultValue={
                      data.areaCode || data.sigunguCode
                        ? `${areaList.filter((area) => area.id === data.areaCode)[0].name}, ${
                            sigunguList[data.areaCode].filter((sigungu: any) => sigungu.id === data.sigunguCode)[0].name
                          }`
                        : ""
                    }
                    className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <label
                    htmlFor="local"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Local
                  </label>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="relative -space-y-px rounded-md shadow-md">
                  <input
                    id="tourist"
                    name="tourist"
                    type="text"
                    autoComplete="tourist"
                    disabled
                    defaultValue="Tourist"
                    className="relative block w-full appearance-none rounded-none rounded-b-md bg-gray-200 border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <label
                    htmlFor="tourist"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Local
                  </label>
                </div>
              </div>
            )
          ) : (
            ""
          )}
          {/* Account Edit으로 가는 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={navigateToAccountEdit}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Edit Account
            </button>
          </div>
          {/* Password Change로 가는 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={navigateToPasswordChange}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountSetting;
