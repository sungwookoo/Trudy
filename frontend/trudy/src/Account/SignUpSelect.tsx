import { SyntheticEvent, useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// 이메일 인증 페이지

function SignUpSelect() {

  const navigate = useNavigate();
  const navigateToEmailConfirm = () => {
    navigate("/emailconfirm");
  };



  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Connect with Local Life!</h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>

          {/* 이메일로 가입하기 */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={navigateToEmailConfirm}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Sign Up with Email
            </button>
          </div>
      </div>
    </div>
  );
}

export default SignUpSelect;