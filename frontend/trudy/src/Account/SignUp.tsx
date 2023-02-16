import { SyntheticEvent, useState, useEffect, useContext } from "react";
import AuthContext from "../Common/authContext";
import EmailConfirm from "./EmailConfirm";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// 로그인 페이지

function SignUp() {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [isLocal, setIsLocal] = useState<string>("");
  const [areaCode, setAreaCode] = useState<any>(null);
  const [sigunguCode, setSigunguCode] = useState<number>(0);

  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isBirthday, setIsBirthday] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongPasswordConfirm, setWrongPasswordConfirm] =
    useState<boolean>(false);
  const [wrongName, setWrongName] = useState<boolean>(false);
  const [existName, setExistName] = useState<boolean>(false);
  const [wrongGender, setWrongGender] = useState<boolean>();
  const [wrongBirthday, setWrongBirthday] = useState<boolean>();
  const [wrongIsLocal, setWrongIsLocal] = useState<boolean>();
  const [wrongAreaCode, setWrongAreaCode] = useState<boolean>();
  const [wrongSigunguCode, setWrongSigunguCode] = useState<boolean>();
  const { state } = useLocation();
  const email = state;

  const authCtx = useContext(AuthContext);

  const currentDate = new Date();

  const handleAreaClick = (id: number) => {
    setAreaCode(id);
    setSigunguCode(0);
    setWrongAreaCode(false);
    setWrongSigunguCode(false);
  };

  const navigate = useNavigate();
  function navigateToLending() {
    navigate("/");
  }

  function CheckPassword(password: string) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}/.test(password)) {
      return 1;
    } else {
      return 0;
    }
  }
  function CheckPasswordConfirm(passwordConfirm: string) {
    if (password === passwordConfirm) {
      return 1;
    } else {
      return 0;
    }
  }
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
    const url = "/api/signup/name";
    const params = { name: name };
    try {
      const response: any = await axios.post(url, {}, { params });
      if (response.data === 1) {
        return true;
      } else {
        return false;
      }
    } catch {}
  }

  useEffect(() => {
    return authCtx.defaultVerified;
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
              placeholder={email}
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Email
            </label>
          </div>
        </div>

        <form className="mt-8 space-y-6" action="/api/member" method="POST">
          {/* 비밀번호 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none rounded-b-md border text-sm text-gray-900 bg-transparent border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  wrongPassword ? "border-red-700 border-2 " : "border-gray-300"
                }`}
                placeholder=" "
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (CheckPassword(e.target.value) === 1) {
                    setIsPassword(true);
                    setWrongPassword(false);
                  } else {
                    setIsPassword(false);
                  }
                  if (e.target.value === passwordConfirm) {
                    setIsPasswordConfirm(true);
                    setWrongPasswordConfirm(false);
                  } else {
                    setIsPasswordConfirm(false);
                  }
                }}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
            </div>
            {password === "" || CheckPassword(password) ? null : (
              <p className="text-sm text-red-500">
                8 to 16 characters with a combination of uppercases, lowercases,
                numbers, and special characters
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none rounded-b-md border text-sm text-gray-900 bg-transparent border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  ${
                  wrongPasswordConfirm
                    ? "border-red-700 border-2"
                    : "border-gray-300"
                }`}
                placeholder=" "
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  if (CheckPasswordConfirm(e.target.value) === 1) {
                    setIsPasswordConfirm(true);
                    setWrongPasswordConfirm(false);
                  } else {
                    setIsPasswordConfirm(false);
                  }
                }}
              />
              <label
                htmlFor="passwordConfirm"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password Confirm
              </label>
            </div>
            {passwordConfirm === "" ||
            CheckPasswordConfirm(passwordConfirm) ? null : (
              <div className="text-sm text-red-500">password don't match</div>
            )}
          </div>

          {/* 닉네임 */}
          <div className="">
            <div className="relative -space-y-px rounded-md shadow-md">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="nickname"
                required
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
                  if (CheckNickName(e.target.value) === 1) {
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
              {existName ? (
                <ul className="text-sm text-red-700">
                  This nickname already exists
                </ul>
              ) : null}
              {name === "" || /^[a-zA-Z0-9]{4,16}$/.test(name) ? null : (
                <ul className="text-sm text-red-500">
                  4 characters or more and 16 characters or less, consisting of
                  English or numbers
                </ul>
              )}
            </ul>
          </div>

          {/* 성별 */}
          <div
            className={`relative -space-y-px rounded-md shadow-md border ${
              wrongGender ? "border-red-700 border-2" : null
            }`}
          >
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
                    required
                    onChange={(e) => {
                      setGender(e.target.value);
                      setWrongGender(false);
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
                  onChange={(e) => {
                    setGender(e.target.value);
                    setWrongGender(false);
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
                  onChange={(e) => {
                    setGender(e.target.value);
                    setWrongGender(false);
                  }}
                />
                <label htmlFor="unknown">I prefer not to say</label>
              </div>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <div
              className={`relative -space-y-px rounded-md shadow-md border p-4 ${
                wrongBirthday ? "border-red-700 border-2" : null
              }`}
            >
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
            {birthday === "" || CheckBirthday(birthday) ? null : (
              <p className="text-sm text-red-500">Invalid birthday</p>
            )}
          </div>

          {/* 로컬여부 */}
          <div
            className={`relative -space-y-px rounded-md shadow-md border p-4 ${
              wrongIsLocal ? "border-red-700 border-2" : null
            }`}
          >
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
                onChange={(e) => {
                  setIsLocal(e.target.value);
                  setWrongIsLocal(false);
                }}
              />
              Local
              <input
                id="tourist"
                name="islocal"
                type="radio"
                value="0"
                required
                onChange={(e) => {
                  setIsLocal(e.target.value);
                  setWrongIsLocal(false);
                  setAreaCode(null);
                  setSigunguCode(0);
                }}
              />
              Tourist
            </div>
          </div>

          {/* 지역 */}
          <div className="">
            {isLocal === "1" ? (
              <>
                <div
                  className={`relative -space-y-px rounded-md shadow-md border p-3 ${
                    wrongAreaCode ? "border-red-700 border-2" : null
                  }`}
                >
                  <AreaSelect
                    key={0}
                    areaCode={areaList}
                    onClick={handleAreaClick}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Area
                  </label>
                </div>
                {areaCode && (
                  <div
                    className={`relative -space-y-px rounded-md shadow-md border p-3 ${
                      wrongSigunguCode ? "border-red-700 border-2" : null
                    }`}
                  >
                    <div className="flex flex-col">
                      {sigunguList[areaCode].map(
                        (sigunguInfo: any, i: number) => (
                          <div key={i} className="flex items-center mb-2">
                            <label
                              key={i}
                              htmlFor={`classification-${areaCode.id}`}
                              className="inline-block bg-trudy rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                              <input
                                className="mr-2"
                                name="sigungu-select"
                                type="radio"
                                id={`sigungu-${sigunguInfo.id}`}
                                checked={sigunguCode === sigunguInfo.id}
                                onChange={() => {
                                  setSigunguCode(sigunguInfo.id);
                                  setWrongSigunguCode(false);
                                }}
                              />
                              <label htmlFor={`sigungu-${sigunguInfo.id}`}>
                                {sigunguInfo.name}
                              </label>
                            </label>
                          </div>
                        )
                      )}
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

          {/* 회원가입 완료 버튼 */}
          <div>
            <button
              type="button"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={async (e) => {
                if (
                  isPassword === true &&
                  isPasswordConfirm === true &&
                  isName === true &&
                  existName === false &&
                  isBirthday === true &&
                  wrongGender === false &&
                  wrongIsLocal === false
                ) {
                  if (isLocal === "0") {
                    const response: any = await authCtx.signup(
                      email,
                      password,
                      name,
                      gender,
                      birthday,
                      isLocal,
                      areaCode,
                      sigunguCode
                    );
                    if (response !== null) {
                      authCtx.login(email, password);
                      navigateToLending();
                    }
                  } else {
                    if (areaCode !== null && sigunguCode !== 0) {
                      const response: any = await authCtx.signup(
                        email,
                        password,
                        name,
                        gender,
                        birthday,
                        isLocal,
                        areaCode,
                        sigunguCode
                      );
                      if (response !== null) {
                        authCtx.login(email, password);
                        navigateToLending();
                      }
                    } else {
                      if (areaCode === null) {
                        setWrongAreaCode(true);
                      }
                      if (areaCode !== null && sigunguCode === 0) {
                        setWrongSigunguCode(true);
                      }
                    }
                  }
                } else {
                  if (isPassword === false) {
                    setWrongPassword(true);
                  }
                  if (isPasswordConfirm === false) {
                    setWrongPasswordConfirm(true);
                  }
                  if (isName === false || existName === true) {
                    setWrongName(true);
                  }
                  if (gender === "") {
                    setWrongGender(true);
                  }
                  if (isBirthday === false) {
                    setWrongBirthday(true);
                  }
                  if (isLocal === "") {
                    setWrongIsLocal(true);
                  }
                  if (isLocal === "1" && areaCode === null) {
                    setWrongAreaCode(true);
                  }
                  if (
                    isLocal === "1" &&
                    areaCode !== null &&
                    sigunguCode === 0
                  ) {
                    setWrongSigunguCode(true);
                  }
                }
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
