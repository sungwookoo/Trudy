import { SyntheticEvent, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";

// 계정 정보 수정을 위한 비밀번호 확인 페이지

function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] =
    useState<boolean>(false);
  const [wrongCurrentPassword, setWrongCurrentPassword] =
    useState<boolean>(false);
  const [wrongNewPassword, setWrongNewPassword] = useState<boolean>(false);
  const [wrongNewPasswordConfirm, setWrongNewPasswordConfirm] =
    useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  // 비밀번호 유효성 검사
  function CheckPassword(password: string) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}/.test(password)) {
      return 1;
    } else {
      return 0;
    }
  }

  // 새 비밀번호 일치 검사
  function CheckNewPasswordConfirm(newPasswordConfirm: string) {
    if (newPassword === newPasswordConfirm) {
      return 1;
    } else {
      return 0;
    }
  }

  // Enter를 눌렀을 때 Submit을 실행시키는 함수
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      ChangePassword();
    }
  };

  // 수정버튼을 실행하는 함수
  async function ChangePassword() {
    if (
      isNewPassword === true &&
      isNewPasswordConfirm === true &&
      wrongNewPassword === false &&
      wrongNewPasswordConfirm === false
    ) {
      const response: any = await authCtx.passwordChange(
        currentPassword,
        newPassword
      );
      if (response !== null) {
        alert("Success!");
        NavigateToAccountSetting();
      } else {
        setWrongCurrentPassword(true);
      }
    } else {
      if (isNewPassword === false) {
        setWrongNewPassword(true);
      }
      if (isNewPasswordConfirm === false) {
        setWrongNewPasswordConfirm(true);
      }
    }
  }

  function NavigateToAccountSetting() {
    navigate("/accountsetting");
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
        <div>
          {/* 현재 비밀번호 */}
          <div className="relative -space-y-px rounded-md shadow-sm">
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="password"
              required
              className={`relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                wrongCurrentPassword ? "border-red-700 border-2" : null
              }`}
              placeholder=" "
              onKeyDown={pressEnter}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setWrongCurrentPassword(false);
              }}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Current Password
            </label>
          </div>
        </div>

        <div>
          {/* 변경할 비밀번호 */}
          <div className="relative -space-y-px rounded-md shadow-sm">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="password"
              required
              className={`relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                wrongNewPassword ? "border-red-700 border-2" : null
              }`}
              placeholder=" "
              onKeyDown={pressEnter}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (CheckPassword(e.target.value) === 1) {
                  setIsNewPassword(true);
                  setWrongNewPassword(false);
                } else {
                  setIsNewPassword(false);
                }
                if (e.target.value === newPasswordConfirm) {
                  setIsNewPasswordConfirm(true);
                  setWrongNewPasswordConfirm(false);
                } else {
                  setIsNewPasswordConfirm(false);
                }
              }}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              New Password
            </label>
          </div>
          {newPassword === "" || CheckPassword(newPassword) ? null : (
            <p className="text-sm text-red-500">
              8 to 16 characters with a combination of uppercases, lowercases,
              numbers, and special characters
            </p>
          )}
        </div>

        <div>
          {/* 변경할 비밀번호 확인 */}
          <div className="relative -space-y-px rounded-md shadow-sm">
            <input
              id="newPasswordCheck"
              name="newPasswordCheck"
              type="password"
              autoComplete="password"
              required
              className={`relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                wrongNewPasswordConfirm ? "border-red-700 border-2" : null
              }`}
              placeholder=" "
              onKeyDown={pressEnter}
              onChange={(e) => {
                setNewPasswordConfirm(e.target.value);
                if (CheckNewPasswordConfirm(e.target.value) === 1) {
                  setIsNewPasswordConfirm(true);
                  setWrongNewPasswordConfirm(false);
                } else {
                  setIsNewPasswordConfirm(false);
                }
              }}
            />
            <label
              htmlFor="passwordConfirm"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              New Password Confirm
            </label>
          </div>
          {newPasswordConfirm === "" ||
          CheckNewPasswordConfirm(newPasswordConfirm) ? null : (
            <div className="text-sm text-red-500">password don't match</div>
          )}
        </div>

        <div>
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={ChangePassword}
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

export default PasswordChange;
