import { SyntheticEvent, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import SignUp from "./SignUp";

// 이메일 인증 페이지

function EmailConfirm() {
  const [email, setEmail] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [time, setTime] = useState<boolean>(false);
  const [send, setSend] = useState<number>(0);
  const [code, setCode] = useState<string>("");

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  function navigateToSignUp() {
    navigate("/signup", { state: email });
  }

  //   인증 코드 전송 버튼을 누르는 함수
  function clickSendCode() {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputEmail) === true) {
      setSend(send + 1);
      setEmail(inputEmail);
    } else {
      alert("Wrong Email!");
    }
  }

  //   Enter를 눌렀을 때 clickSendCode를 실행시키는 함수
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      clickSendCode();
    }
  };

  //   Enter를 눌렀을 때 checkCode를 실행시키는 함수
  const pressEnterCode = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      checkCode();
    }
  };

  //   인증 코드를 보내는 함수
  useEffect(() => {
    if (send === 0) {
      return;
    }
    let timeout = setTimeout(() => {}, 0);
    if (time === true && inputEmail === email) {
      alert("you can only be sent code once every 30seconds!");
    } else {
      setTime(true);
      timeout = setTimeout(() => {
        setTime(false);
      }, 30000);
      async function SendCode() {
        const res: any = await authCtx.sendCode(email);
        if (res !== null) {
          setCode(res.data);
        }
      }
      SendCode();
    }
  }, [send]);

  //   인증 코드를 확인하는 함수
  function checkCode() {
    if (inputCode !== "" && inputCode === code) {
      authCtx.emailVerified(email);
      navigateToSignUp();
    } else {
      alert("Incorrect Code!");
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Connect with Local Life!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <div className="relative -space-y-px rounded-md shadow-sm">
          {/* 이메일 주소 */}
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            onKeyDown={pressEnter}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={clickSendCode}
            className="absolute flex inset-y-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            send code
          </button>
        </div>

        <div>
          <input
            id="verifyCode"
            name="verifyCode"
            type="text"
            required
            className="rounded-none w-full rounded-t-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Verify Code"
            onKeyDown={pressEnterCode}
            onChange={(e) => {
              setInputCode(e.target.value);
            }}
          />

          {/* 이메일 인증 버튼 */}
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={checkCode}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirm;
