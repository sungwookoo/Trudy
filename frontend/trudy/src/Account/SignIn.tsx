import axios from "axios";
import React, {
  SyntheticEvent,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import "./Signin.css";

// 로그인 페이지

function SignIn() {
  const navigate = useNavigate();
  const navigateToSignUpSelect = () => {
    navigate("/signupselect");
  };

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInput.current!.value;
    const password = passwordInput.current!.value;

    authCtx.login(email, password);
    if (authCtx.isSuccess) {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-32">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="faviconTrudy.png"
              alt="trudy logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="-space-y-px rounded-md shadow-sm">
              {/* 이메일 주소 입력 */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  ref={emailInput}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  ref={passwordInput}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* 아이디, 비밀번호 저장 */}
              {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div> */}

              {/* 비밀번호 찾기 */}
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {/* Forgot your password? */}
                </a>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>

            {/* 회원가입 버튼 */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={navigateToSignUpSelect}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>
  );
}

export default SignIn;
