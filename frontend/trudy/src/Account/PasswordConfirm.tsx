import { SyntheticEvent, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";

// 계정 정보 수정을 위한 비밀번호 확인 페이지

function PasswordConfirm() {
  const [password, setPassword] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  function navigateToAccountEdit() {
    navigate("/accountedit");
  }

  const data = authCtx.getMyData()
  console.log('최종', data)

    // Enter를 눌렀을 때 CheckPassword를 실행시키는 함수
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      CheckPassword();
    }
  };

  //   비밀번호를 확인하는 함수
  function CheckPassword() {
    if (inputPassword !== "" && inputPassword === password) {
      navigateToAccountEdit();
    } else {
      alert("Incorrect Password!");
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Please enter a password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <div className="relative -space-y-px rounded-md shadow-sm">
          {/* 이메일 주소 */}
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            onKeyDown={pressEnter}
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          />
        </div>

        <div>
          {/* 이메일 인증 버튼 */}
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={CheckPassword}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordConfirm;
