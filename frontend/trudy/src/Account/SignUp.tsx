import { SyntheticEvent, useState, useEffect, useContext } from "react";
import AuthContext from "../Common/authContext";
import EmailConfirm from "./EmailConfirm";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const { state } = useLocation();
  const email = state;

  const authCtx = useContext(AuthContext);
  const handleAreaClick = (id: number) => {
    setAreaCode(id);
  };

  const navigate = useNavigate();
  function navigateToLending() {
    navigate("/");
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
          <div>
            Email
            <input
              id="email"
              name="email"
              type="email"
              disabled
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 placeholder-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder={email}
            />
          </div>
        </div>

        <form className="mt-8 space-y-6" action="/api/member" method="POST">
          {/* 비밀번호 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              Password
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) => {
                  if (
                    !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(
                      e.target.value
                    )
                  ) {
                    setIsPassword(false);
                  } else {
                    setIsPassword(true);
                    setPassword(e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              Password Confirm
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password Confirm"
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  if (password !== passwordConfirm) {
                  }
                }}
              />
            </div>
          </div>

          {/* 닉네임 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              Nickname
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="nickname"
                required
                minLength={4}
                maxLength={16}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Nickname"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>

          {/* 성별 */}
          <div>
            <div>
              <h1>Gender</h1>
              <label htmlFor="male">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="Male"
                  required
                  onChange={(e) => setGender(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="unknown">I prefer not to say</label>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="-space-y-px rounded-md">
            <div>
              <label htmlFor="birthday">Birthday</label>
              <br />
              <input
                id="birthday"
                name="birthday"
                type="month"
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>

          {/* 로컬여부 */}
          <div className="-space-y-px rounded-md">
            <div>
              <label htmlFor="Local">Local</label>
              <br />
              <input
                id="local"
                name="islocal"
                type="radio"
                value="1"
                required
                onChange={(e) => setIsLocal(e.target.value)}
              />
              Local
              <input
                id="tourist"
                name="islocal"
                type="radio"
                value="0"
                required
                onChange={(e) => setIsLocal(e.target.value)}
              />
              Tourist
            </div>
            <br />

            {/* 지역 */}
            {isLocal === "1" ? (
              <>
                <AreaSelect
                  key={0}
                  areaCode={areaList}
                  onClick={handleAreaClick}
                />
                {areaCode && (
                  <div className="flex flex-col">
                    {sigunguList[areaCode].map(
                      (sigunguInfo: any, i: number) => (
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
                      )
                    )}
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

                if (response !== undefined) {
                  authCtx.login(email, password);
                  navigateToLending();
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
