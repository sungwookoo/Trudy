import { SyntheticEvent, useState, useEffect, useContext } from "react";
import AuthContext from "../Common/authContext";
import EmailConfirm from "./EmailConfirm";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Place from "../TrudyMap/Place";
// 로그인 페이지

function AccountEdit() {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [isLocal, setIsLocal] = useState<string>("");
  const [thisAreaCode, setThisAreaCode] = useState<any>(null);
  const [thisSigunguCode, setThisSigunguCode] = useState<number>(0);
  const [data, setData] = useState<any>();

  const [isName, setIsName] = useState<boolean>(true);
  const [isBirthday, setIsBirthday] = useState<boolean>(true);

  const [wrongName, setWrongName] = useState<boolean>(false);
  const [existName, setExistName] = useState<boolean>(false);
  const [wrongBirthday, setWrongBirthday] = useState<boolean>();
  const [wrongAreaCode, setWrongAreaCode] = useState<boolean>();
  const [wrongSigunguCode, setWrongSigunguCode] = useState<boolean>();

  const authCtx = useContext(AuthContext);

  const currentDate = new Date();

  const handleAreaClick = (id: number) => {
    setThisAreaCode(id);
    setThisSigunguCode(0);
    setWrongAreaCode(false);
    setWrongSigunguCode(false);
  };

  type AreaCodeType = {
    areaCode: Array<{
      id: number;
      name: string;
    }>;
    onClick: (id: number, name: string) => void;
  };

  function AreaSelect({ areaCode, onClick }: AreaCodeType) {
    return (
      <div className="flex flex-wrap">
        {areaCode.map((areaCode, i) => (
          <div className="p-1">
            <label
              key={i}
              htmlFor={`classification-${areaCode.id}`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              <input
                type="radio"
                name="areaCode"
                id={`classification-${areaCode.id}`}
                className="mr-0.5 color-green-500"
                // checked={thisAreaCode === areaCode.id}
                onClick={() => {
                  onClick(areaCode.id, areaCode.name);
                }}
              />
              {areaCode.name}
            </label>
          </div>
        ))}
      </div>
    );
  }

  const navigate = useNavigate();
  function navigateToAccountSetting() {
    navigate("/accountsetting");
  }

  function Cancel() {
    navigate(-1);
  }

  useEffect(() => {
    async function MyData() {
      const response: any = await authCtx.getMyData();
      setData(response);
    }
    MyData();
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.data.name);
      setGender(data.data.gender);
      setBirthday(data.data.birth);
      setIsLocal(data.data.isLocal);
      setThisAreaCode(data.data.areaCode);
      setThisSigunguCode(data.data.sigunguCode);
    }
  }, [data]);

  function CheckNickName(name: string) {
    if (/^[a-zA-Z0-9]{4,16}$/.test(name)) {
      return 1;
    } else {
      return 0;
    }
  }
  function CheckBirthday(birthday: string) {
    if (new Date(birthday) <= currentDate) {
      return 1;
    } else {
      return 0;
    }
  }

  // 중복 닉네임 확인
  async function isExistName(name: string) {
    const url = "/api/member/info/name";
    const headers = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    const params = { name: name };
    // const data = new FormData();
    // data.append("name", JSON.stringify(name));
    try {
      const response: any = await axios.post(url, {}, { headers, params });
      if (response.data === 1) {
        return true;
      } else {
        return false;
      }
    } catch {}
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <p className="mt-2 text-center text-sm text-gray-600"></p>
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
                required
                defaultValue={name}
                minLength={4}
                maxLength={16}
                className={`relative block w-full appearance-none rounded-none rounded-b-md border text-sm text-gray-900 bg-transparent border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  ${
                  wrongName ? "border-red-700 border-2" : "border-gray-300"
                }`}
                placeholder=" "
                onChange={(e) => {
                  setName(e.target.value);
                  isExistName(e.target.value).then((res: any) => {
                    setExistName(res);
                  });
                  if (CheckNickName(name) === 1) {
                    setIsName(true);
                    setWrongName(false);
                  } else {
                    setIsName(false);
                  }
                }}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nickname
              </label>
            </div>
            <ul>
              {existName ? <ul className="text-sm text-red-700">This nickname already exists</ul> : null}
              {name === "" || /^[a-zA-Z0-9]{4,16}$/.test(name) ? null : (
                <ul className="text-sm text-red-500">4 characters or more and 16 characters or less, consisting of English or numbers</ul>
              )}
            </ul>
          </div>

          {/* 성별 */}
          <div className={`relative -space-y-px rounded-md shadow-md border`}>
            <div className="block p-4">
              <div className="">
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 left-1"
                >
                  Gender
                </label>
                <label htmlFor="male">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="Male"
                    checked={gender === "male" || gender === "Male"}
                    required
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  Male
                </label>
              </div>

              <div>
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="Female"
                  required
                  checked={gender === "Female" || gender === "female"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <label htmlFor="female">Female</label>
              </div>

              <div>
                <input
                  id="unknown"
                  name="gender"
                  type="radio"
                  required
                  value="unknown"
                  checked={gender === "unknown" || gender === "Unknown"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <label htmlFor="unknown">I prefer not to say</label>
              </div>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <div className={`relative -space-y-px rounded-md shadow-md border p-4 ${wrongBirthday ? "border-red-700 border-2" : null}`}>
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 left-1"
              >
                Birthday
              </label>
              <input
                id="birthday"
                name="birthday"
                type="month"
                required
                defaultValue={birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                  if (CheckBirthday(e.target.value) === 1) {
                    setIsBirthday(true);
                    setWrongBirthday(false);
                  } else {
                    setIsBirthday(false);
                  }
                }}
              />
            </div>
            {birthday === "" || CheckBirthday(birthday) ? null : <p className="text-sm text-red-500">Invalid birthday</p>}
          </div>

          {/* 로컬여부 */}
          <div className={`relative -space-y-px rounded-md shadow-md border p-4`}>
            <div className="">
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Local
              </label>
              <input
                id="local"
                className=""
                name="islocal"
                type="radio"
                value="1"
                required
                checked={isLocal === "1"}
                onChange={(e) => {
                  setIsLocal(e.target.value);
                }}
              />
              Local
              <input
                id="tourist"
                name="islocal"
                type="radio"
                value="0"
                required
                checked={isLocal === "0"}
                onChange={(e) => {
                  setIsLocal(e.target.value);
                  setThisAreaCode(null);
                  setThisSigunguCode(0);
                }}
              />
              Tourist
            </div>
          </div>

          {/* 지역 */}
          <div className="">
            {isLocal === "1" ? (
              <>
                <div className={`relative -space-y-px rounded-md shadow-md border p-3 ${wrongAreaCode ? "border-red-700 border-2" : null}`}>
                  {AreaSelect({ areaCode: areaList, onClick: handleAreaClick })}
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Area
                  </label>
                </div>
                {thisAreaCode && (
                  <div className={`relative -space-y-px rounded-md shadow-md border p-3 ${wrongSigunguCode ? "border-red-700 border-2" : null}`}>
                    <div className="flex flex-col">
                      {sigunguList[thisAreaCode].map((sigunguInfo: any, i: number) => (
                        <div key={i} className="flex items-center mb-2">
                          <label
                            key={i}
                            htmlFor={`classification-${thisAreaCode.id}`}
                            className="inline-block bg-trudy rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                          >
                            <input
                              className="mr-2"
                              name="sigungu-select"
                              type="radio"
                              id={`sigungu-${sigunguInfo.id}`}
                              checked={thisSigunguCode === sigunguInfo.id}
                              onChange={() => {
                                setThisSigunguCode(sigunguInfo.id);
                                setWrongSigunguCode(false);
                              }}
                            />
                            <label htmlFor={`sigungu-${sigunguInfo.id}`}>{sigunguInfo.name}</label>
                          </label>
                        </div>
                      ))}
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Sigungu
                      </label>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>

          {/* 수정 완료 버튼 */}
          <div>
            <button
              type="button"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={async (e) => {
                if (isName === true && existName === false && isBirthday === true) {
                  if (isLocal === "0") {
                    const response = await authCtx.accountEdit(name, gender, birthday, isLocal, thisAreaCode, thisSigunguCode);
                    if (response !== null) {
                      alert("Success!");
                      navigateToAccountSetting();
                    }
                  } else {
                    if (thisAreaCode !== null && thisSigunguCode !== 0) {
                      const response = await authCtx.accountEdit(name, gender, birthday, isLocal, thisAreaCode, thisSigunguCode);
                      if (response !== null) {
                        alert("Success!");
                        navigateToAccountSetting();
                      }
                    } else {
                      if (thisAreaCode === null) {
                        setWrongAreaCode(true);
                      }
                      if (thisAreaCode !== null && thisSigunguCode === 0) {
                        setWrongSigunguCode(true);
                      }
                    }
                  }
                } else {
                  if (isName === false || existName === true) {
                    setWrongName(true);
                  }
                  if (isBirthday === false) {
                    setWrongBirthday(true);
                  }
                  if (isLocal === "1" && thisAreaCode === null) {
                    setWrongAreaCode(true);
                  }
                  if (isLocal === "1" && thisAreaCode !== null && thisSigunguCode === 0) {
                    setWrongSigunguCode(true);
                  }
                }
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Edit
            </button>
          </div>
        </form>
        <div>
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(e) => {
              Cancel();
            }}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountEdit;
