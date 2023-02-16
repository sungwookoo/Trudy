import { SyntheticEvent, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";

// 계정 정보 수정을 위한 비밀번호 확인 페이지

function PasswordConfirm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [isLocal, setIsLocal] = useState<string>("");
  const [thisAreaCode, setThisAreaCode] = useState<any>(null);
  const [thisSigunguCode, setThisSigunguCode] = useState<number>(0);
  const [data, setData] = useState<any>();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  function navigateToAccountEdit() {
    navigate("/accountedit");
  }

  useEffect(() => {
    async function GetData() {
      const response: any = await authCtx.getMyData();
      setEmail(response.data.email);
    }
    GetData();
  }, []);

  // Enter를 눌렀을 때 CheckPassword를 실행시키는 함수
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      CheckPassword();
    }
  };

  //   비밀번호를 확인하는 함수
  async function CheckPassword() {
    const response: any = await authCtx.login(email, password);
    if (response === true) {
      authCtx.passwordVerified();
      navigateToAccountEdit();
    }
  }

  function Cancel() {
    navigate(-1);
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Change your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <div className="relative -space-y-px rounded-md shadow-sm">
          {/* 현재 비밀번호 */}
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="password"
            required
            className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Current Password"
            onKeyDown={pressEnter}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="relative -space-y-px rounded-md shadow-sm">
          {/* 변경할 비밀번호 */}
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="password"
            required
            className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="new Password"
            onKeyDown={pressEnter}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="relative -space-y-px rounded-md shadow-sm">
          {/* 변경할 비밀번호 확인 */}
          <input
            id="newPasswordCheck"
            name="newPasswordCheck"
            type="password"
            autoComplete="password"
            required
            className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="New Password Confirm"
            onKeyDown={pressEnter}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={CheckPassword}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Submit
          </button>
        </div>
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

export default PasswordConfirm;
