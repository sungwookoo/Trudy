import { SyntheticEvent, useState, useEffect, useRef } from "react";
import "./SignUp.css";

// 로그인 페이지

function SignUp() {
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [islocal, setIslocal] = useState<number>(0);
  const [region, setRegion] = useState<string[]>([]);
  const [regionDetail, setRegionDetail] = useState<string[]>([]);

  async function submit(event: SyntheticEvent) {
    event.preventDefault();

    // await fetch("로그인 url");
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />

          {/* 비밀번호 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              <label htmlFor="password-confirm" className="sr-only">
                Password Confirm
              </label>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password Confirm"
              />
            </div>
          </div>

          {/* 닉네임 */}
          <div className="-space-y-px rounded-md shadow-md">
            <div>
              <label htmlFor="Nickname" className="sr-only">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
                required
                minLength={4}
                maxLength={16}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Nickname"
              />
            </div>
          </div>

          {/* 성별 */}
          <div>
            <div>
              <label htmlFor="Gender">Gender</label>
              <br />
              <input id="male" name="gender" type="radio" required />
              Male
              <input id="female" name="gender" type="radio" required />
              Female
              <input id="female" name="gender" type="radio" required />I prefer
              not to say
            </div>
          </div>

          {/* 생년월일 */}
          <div className="-space-y-px rounded-md">
            <div>
              <label htmlFor="Birthday">Birthday</label>
              <br />
              <input id="birthday" name="birthday" type="month" required />
            </div>
          </div>

          {/* 로컬여부 */}
          <div className="-space-y-px rounded-md">
            <div>
              <label htmlFor="Local">Local</label>
              <br />
              <input id="islocal" name="islocal" type="radio" required />
              Yes
              <input id="islocal" name="islocal" type="radio" required />
              No
            </div>

            {/* 지역 */}
            <div className="-space-y-px rounded-md">
              <div>
                <label htmlFor="Region">Region</label>
                <br />
                <div>
                  <input id="region" name="region" type="radio" required />
                  region
                </div>
                <div>
                  <input
                    id="regionDetail"
                    name="regionDetail"
                    type="radio"
                    required
                  />
                  regionDetail
                </div>
              </div>
            </div>
          </div>

          <div></div>

          {/* 회원가입 완료 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
