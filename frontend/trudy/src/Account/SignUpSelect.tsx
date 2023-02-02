import { SyntheticEvent, useState, useEffect, useRef } from "react";
import "./SignUpSelect.css";

// 로그인 페이지

function SignUpSelect() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function submit(event: SyntheticEvent) {
    event.preventDefault();

    // await fetch("로그인 url");
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="faviconTrudy.png" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Connect with Local Life!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            {/* 이메일 주소 */}
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
              />
            </div>
          </div>

          {/* 이메일 인증 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-trudy-dark1 py-2 px-4 text-sm font-bold text-black hover:bg-trudy-dark2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpSelect;
